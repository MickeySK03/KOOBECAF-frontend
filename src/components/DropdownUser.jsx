import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../stores/slices/authSlice";

import Avatar from "./Avatar";
import ProfileModal from "./ProfileModal";
import ProfileUser from "../features/profile/ProfileUser";
import EditUser from "../features/profile/EditUser";
import { logoutProduct, resetSearchProduct } from "../stores/slices/productSlice";

export default function DropdownUser() {
    const { authUserData } = useSelector((state) => state.auth);
    const [editUser, setEditUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dropDownEl = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropDownEl.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative text-black" ref={dropDownEl}>
            <ProfileModal open={isOpenModal}>
                <ProfileUser
                    setEditUser={setEditUser}
                    onClose={() => {
                        setIsOpenModal(false);
                    }}
                />
            </ProfileModal>

            <ProfileModal open={editUser}>
                <EditUser
                    setIsOpen={setIsOpenModal}
                    onClose={() => {
                        setEditUser(false);
                    }}
                />
            </ProfileModal>
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <Avatar src={authUserData?.profileImage} />
            </div>
            {isOpen && (
                <div className=" w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2">
                    <div
                        className="flex gap-4 p-2 item-center hover:bg-gray-100 rounded-xl"
                        onClick={() => {
                            setIsOpenModal(true);
                            setIsOpen(false);
                        }}
                    >
                        <Avatar src={authUserData?.profileImage} />
                        <div>
                            <div className="font-semibold text-black">
                                {authUserData?.firstName} {authUserData?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">See Your Profile</div>
                        </div>
                    </div>

                    <hr className="m-2 border" />
                    <div
                        className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"
                        onClick={() => {
                            dispatch(logout());
                            dispatch(logoutProduct());
                            dispatch(resetSearchProduct());
                        }}
                    >
                        <div className="flex flex-1 justify-end items-center gap-4 ">
                            <div className="font-semibold text-sm text-black ">Log Out</div>
                            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
                                <BiLogOut />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
