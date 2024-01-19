import { FaTag, FaTags } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CategorieItem from "../features/filter/CategorieItem";
import ProfileModal from "../components/ProfileModal";
import ProfileUser from "../features/profile/ProfileUser";
import EditUser from "../features/profile/EditUser";
import Avatar from "../components/Avatar";
import Skeleton from "react-loading-skeleton";

function SideNavCreate() {
    const { authUserData, loading } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [skeleton, setSkeleton] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    return (
        <>
            <div className="flex flex-col gap-2 px-4">
                <div className="sticky h-6" />
                <div className="text-2xl font-bold pl-2">Create new listing</div>
                <div>
                    <CategorieItem
                        icons={<FaTag />}
                        isActive={pathname === "/create"}
                        title={"Choose listing type"}
                        to={true}
                    />
                </div>
                <div className="border-b-2 mb-2 pb-2" />
                <CategorieItem
                    icons={<FaTags />}
                    isActive={pathname === "/selling"}
                    to="/selling"
                    title={"Your listings"}
                />

                {skeleton ? (
                    <div>
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

export default SideNavCreate;
