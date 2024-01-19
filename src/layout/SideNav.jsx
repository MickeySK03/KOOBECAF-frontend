import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaStore, FaTags } from "react-icons/fa6";

import ChangeLocation from "../features/subscribe/ChangeLocation";
import ProfileModal from "../components/ProfileModal";
import Button from "../components/Button";
import Search from "../features/filter/Search";
import Categories from "../features/filter/Categories";
import CategorieItem from "../features/filter/CategorieItem";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function SideNav() {
    const [isOpen, setIsOpen] = useState(false);

    const { inputSubLocation } = useSelector((state) => state.product);
    const { pathname } = useLocation();
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);
    const { authUserData } = useSelector((state) => state.auth);

    const handleOnClickFilter = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="flex flex-col gap-2 pb-4 border-b-2">
                <div className="sticky">
                    <div className="text-2xl font-semibold pl-5 mt-9">Marketplace</div>
                    <Search nameTagSearch="" div={" "} />
                    <div className="px-4  ">
                        <CategorieItem icons={<FaStore />} title={"Browse All"} isActive={pathname === "/"} />
                    </div>
                    <div className="px-4">
                        <CategorieItem
                            icons={<BsFillBookmarkFill />}
                            title={"Wishlist"}
                            isActive={pathname === "/wishlist"}
                            to="/wishlist"
                        />
                    </div>
                    <div className="px-4">
                        <CategorieItem
                            icons={<FaTags />}
                            title={"Selling"}
                            isActive={pathname === "/selling"}
                            to="/selling"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <Link to={"/create"}>
                        {skeleton ? <Button text={"Create new listing"} /> : <Skeleton width={200} height={45} />}
                    </Link>
                </div>

                {authUserData?.isSubscribe ? (
                    <>
                        {pathname.includes("/messager") || pathname.includes("/inbox") ? null : (
                            <>
                                <div className="px-4 cursor-pointer" onClick={handleOnClickFilter}>
                                    <p className="text-lg font-semibold">Filters</p>
                                    <p className="truncate font-semibold text-main-dark">
                                        {inputSubLocation || "filter by location"}
                                    </p>
                                </div>
                                <ProfileModal open={isOpen}>
                                    <ChangeLocation
                                        onClose={() => {
                                            setIsOpen(false);
                                        }}
                                    />
                                </ProfileModal>
                            </>
                        )}
                    </>
                ) : null}
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-screen pb-52 px-4">
                <Categories />
            </div>
        </>
    );
}

export default SideNav;
