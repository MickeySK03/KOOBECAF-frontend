import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../../stores/slices/chatSlice";
import { useParams } from "react-router-dom";
import datas from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import useDropdown from "./use-dropdown";

function ChatFooter({ socket, productDetail, setMessages }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { authUserData } = useSelector((state) => state?.auth);
    const { receiverId } = useParams();
    const { dropDownEl, isOpen, setIsOpen } = useDropdown();

    const data = {
        text: message,
        name: authUserData?.firstName,
        id: `${socket.id}${Math.random()}`,
        senderId: authUserData?.id,
        receiverId: +receiverId,
        productId: productDetail.id,
        socketID: socket.id,
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
            socket.emit("typing", `${authUserData?.firstName} is typing`);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && authUserData?.firstName) {
            socket.emit("sendMessage", data);
            dispatch(createChat(data));
            setMessages((messages) => [...messages, data]);
        }
        setMessage("");
    };

    return (
        <div className="flex p-3 bg-dark-night bottom-0 rounded-b-xl">
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
