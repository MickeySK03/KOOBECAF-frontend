import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileUser, updateProfileName } from "../../stores/slices/authSlice";
import { FaEdit } from "react-icons/fa";

import Avatar from "../../components/Avatar";
import PictureForm from "./PictureForm";
import CoverImage from "../../components/CoverImage";
import Button from "../../components/Button";
import Skeleton from "react-loading-skeleton";

export default function EditUser({ onClose, setIsOpen }) {
    const [loading, setLoading] = useState(false);
    const { authUserData } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    const [inputProfileName, setInputProfileName] = useState({
        firstName: authUserData?.firstName,
        lastName: authUserData?.lastName,
    });

    const [input, setInput] = useState(null);
    const [inputCoverImage, setInputCoverImage] = useState(null);

    const dispatch = useDispatch();

    const handleOnsave = async (input, inputCoverImage, inputProfileName) => {
        if (!inputCoverImage) inputCoverImage = authUserData.coverImage;
        if (!input) input = authUserData.profileImage;

        await uploadProfileImage(input);
        await uploadCoverImage(inputCoverImage);
        await uploadProfileName(inputProfileName);
        window.location.reload();
    };

    const handleOnClose = () => {
        onClose();
        setIsOpen(true);
    };

    const uploadProfileName = async (inputProfileName) => {
        try {
            const formData = new FormData();

            formData.append("firstName", inputProfileName.firstName);

            formData.append("lastName", inputProfileName.lastName);

            await dispatch(updateProfileName(formData));
            onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const uploadProfileImage = async (input) => {
        try {
            const formData = new FormData();
            formData.append("profileImage", input);
            setLoading(true);
            await dispatch(updateProfileUser(formData));
            onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const uploadCoverImage = async (inputCoverImage) => {
        try {
            const formData = new FormData();
            formData.append("coverImage", inputCoverImage);
            setLoading(true);
            await dispatch(updateProfileUser(formData));
            onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg">
                <div className="flex flex-col items-center py-4 rounded-t-lg bg-dark-night ">
                    <div className="relative">
                        <p className="text-2xl font-bold text-white">Edit Profile</p>
                        <div
                            className="absolute bottom-1 left-[330px] text-2xl text-white hover:text-[#959595] cursor-pointer"
                            onClick={handleOnClose}
                        >
                            X
                        </div>
                    </div>
                </div>

                <div className="border border-empty w-full" />
                <div className="p-4">
                    <div className="flex justify-between pr-3 ">
                        <div className="flex gap-4 pb-2">
                            <p className="text-xl font-bold">Edit Name:</p>
                            {open ? (
                                <div className="text-lg">
                                    <input
                                        type="text"
                                        value={inputProfileName.firstName}
                                        name="firstName"
                                        className="rounded-lg mx-3"
                                        onChange={(e) =>
                                            setInputProfileName((prevProfile) => ({
                                                ...prevProfile,
                                                firstName: e.target.value,
                                            }))
                                        }
                                    />
                                    <input
                                        type="text"
                                        value={inputProfileName.lastName}
                                        name="lastName"
                                        className="rounded-lg"
                                        onChange={(e) =>
                                            setInputProfileName((prevProfile) => ({
                                                ...prevProfile,
                                                lastName: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="text-lg">
                                    {authUserData?.firstName} {authUserData?.lastName}
                                </div>
                            )}
                        </div>
                        <FaEdit className="w-6 h-6 cursor-pointer hover:text-[#959595]" onClick={() => setOpen(true)} />
                    </div>

                    {loading && <></>}

                    <PictureForm
                        title="Profile Image"
                        initialSrc={authUserData?.profileImage}
                        input={input}
                        setInput={setInput}
                    >
                        {(src, onClick) => (
                            <div onClick={onClick} className="flex justify-center">
                                {loading ? (
                                    <Skeleton width={150} height={150} circle={true} />
                                ) : (
                                    <Avatar className="w-[150px]" src={src} />
                                )}
                            </div>
                        )}
                    </PictureForm>

                    <div className="pb-4">
                        <PictureForm
                            title="Cover Image"
                            initialSrc={authUserData?.coverImage}
                            input={inputCoverImage}
                            setInput={setInputCoverImage}
                        >
                            {(src, onClick) => (
                                <div onClick={onClick}>
                                    {loading ? (
                                        <Skeleton containerClassName="flex-1" height={200} />
                                    ) : (
                                        <CoverImage src={src} />
                                    )}
                                </div>
                            )}
                        </PictureForm>
                    </div>
                    <div className="flex justify-end">
                        <Button text={"Save"} onClick={() => handleOnsave(input, inputCoverImage, inputProfileName)} />
                    </div>
                </div>
            </div>
        </>
    );
}
