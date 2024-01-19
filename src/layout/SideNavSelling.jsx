import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaTags, FaArrowLeft } from "react-icons/fa6";

import CategorieItem from "../features/filter/CategorieItem";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import EditUser from "../features/profile/EditUser";
import ProfileModal from "../components/ProfileModal";
import ProfileUser from "../features/profile/ProfileUser";
import Skeleton from "react-loading-skeleton";
import { setInputSubLocation } from "../stores/slices/productSlice";

function SideNavSelling() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const { authUserData } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    const handleClick = () => {
        dispatch(setInputSubLocation(""));
    };

    return (
        <>
            <div className="flex flex-col gap-2 px-4">
                <div className="flex items-center pt-10">
                    <div className=" rounded-full p-2 hover:bg-main">
                        <Link onClick={handleClick} to="/">
                            <FaArrowLeft />
                        </Link>
                    </div>
                    <div className="text-2xl font-semibold pl-2">Selling</div>
                </div>
                <div className="flex justify-center my-3">
                    <Link to={"/create"}>
                        {skeleton ? <Button text={"Create new listing"} /> : <Skeleton width={200} height={45} />}
                    </Link>
                </div>
                <div>
                    <CategorieItem
                        icons={<FaTags />}
                        isActive={pathname === "/selling"}
                        to="/selling"
                        title={"Your listings"}
                    />
                </div>
                <hr className="border" />
                {skeleton ? (
                    <div className="flex flex-col gap-2">
                        <CategorieItem
                            icons={<Avatar src={authUserData?.profileImage} className="" />}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            title={"Marketplace profile"}
                        />
                        <ProfileModal open={isOpen}>
                            <ProfileUser
                                setEditUser={setEditUser}
                                onClose={() => {
                                    setIsOpen(false);
                                }}
                                title={"Marketplace profile"}
                            />
                        </ProfileModal>

                        <ProfileModal open={editUser}>
                            <EditUser
                                setIsOpen={setIsOpen}
                                onClose={() => {
                                    setEditUser(false);
                                }}
                            />
                        </ProfileModal>
                    </div>
                ) : (
                    <div className="flex gap-4 my-[6px] mx-2">
                        <Skeleton width={40} height={40} circle={true} />
                        <Skeleton containerClassName="flex-1" height={40} />
                    </div>
                )}

                <div className="flex flex-col gap-2 overflow-auto h-screen pb-56 px-2" />
            </div>
        </>
    );
}
export default SideNavSelling;
