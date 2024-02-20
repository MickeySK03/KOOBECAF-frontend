import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChat, setFile } from "../../stores/slices/chatSlice";
import { useParams } from "react-router-dom";
import datas from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import useDropdown from "./use-dropdown";

function ChatFooter({ socket, productDetail, setMessages, setImage }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { authUserData } = useSelector((state) => state?.auth);
    const { file } = useSelector((state) => state.chat);
    const { receiverId } = useParams();
    const { dropDownEl, isOpen, setIsOpen } = useDropdown();
    const fileEl = useRef(null);

    const data = {
        text: message,
        name: authUserData?.firstName,
        id: `${socket.id}${Math.random()}`,
        senderId: authUserData?.id,
        receiverId: +receiverId,
        productId: productDetail.id,
        socketID: socket.id,
        // file: dataBuffer,
    };
    useEffect(() => {
        if (!message.length) {
            socket.emit("typing", ``);
        }
    }, [message]);

    const handleTyping = (e) => {
        if (e.key === "Enter") {
            socket.emit("typing", null);
        }
        if (e.key !== "Backspace") {
            socket.emit("typing", `${authUserData?.firstName} is typing ...`);
        }
    };

    const handleFileChange = (e) => {
        dispatch(setFile(e.target.files[0]));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataBuffer = e.target.result;
                data.file = dataBuffer;
                socket.emit("sendFile", data);
                setMessages((messages) => [...messages, data]);
            };
            reader.readAsDataURL(file);
        } else if (message.trim() && authUserData?.firstName) {
            socket.emit("sendMessage", data);
            dispatch(createChat(data));
            setMessages((messages) => [...messages, data]);
        }

        setMessage("");
        dispatch(setFile(null));
    };

    return (
        <div className="flex relative p-3 bg-dark-night bottom-0 rounded-b-xl">
            <div className="flex absolute bottom-0 -translate-y-16 left-1/2 -translate-x-1/2 w-full bg-blue-200">
                <div className="relative mx-auto z-30">
                    <img src={file ? URL.createObjectURL(file) : ""} alt="" className="max-h-[200px]" />
                    {file ? (
                        <div
                            onClick={() => {
                                dispatch(setFile(null));
                            }}
                            className={`flex justify-center absolute -top-2 -right-2 w-7 rounded-full bg-white border-2 cursor-pointer`}
                        >
                            x
                        </div>
                    ) : (
                        <div className="hidden"></div>
                    )}
                </div>
            </div>
            <div
                onClick={() => fileEl.current.click()}
                className="flex items-center cursor-pointer text-second text-2xl"
            >
                <FaPlusCircle />
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} ref={fileEl} />
            <div className="relative flex mx-6" ref={dropDownEl}>
                <button onClick={() => setIsOpen(!isOpen)} text={"emoji"}>
                    <MdOutlineEmojiEmotions className="text-3xl text-second leading-6" />
                </button>
                {isOpen && (
                    <div className="absolute bottom-0 left-0">
                        <Picker
                            data={datas}
                            onEmojiSelect={(el) => {
                                setMessage(message + el.native), setIsOpen(!isOpen);
                            }}
                        />
                    </div>
                )}
            </div>
            <form className="flex items-center justify-between w-full h-full " onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write Something"
                    className="h-full w-full rounded-xl border-solid outline-none "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="text-white mx-6 border px-3 py-1 rounded-lg bg-second-dark"> Send </button>
            </form>
        </div>
    );
}

export default ChatFooter;
