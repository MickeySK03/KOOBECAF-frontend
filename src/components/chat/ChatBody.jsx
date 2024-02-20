import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFile } from "../../stores/slices/chatSlice";
import bgChat from "../../assets/Images/bgChat.png";

function ChatBody({ messages, lastMessageRef, typingStatus, authUserData }) {
    const dispatch = useDispatch();
    const { file } = useSelector((state) => state.chat);

    return (
        <>
            <div
                className="w-full relative max-h-[650px] h-screen px-5 overflow-y-scroll bg-empty mt-4 rounded-t-xl bg-cover"
                style={{ backgroundImage: `url(${bgChat})` }}
            >
                {/* Message sent from you  */}
                {messages?.map((message) =>
                    message.senderId === authUserData?.id ? (
                        <div className="flex flex-col justify-end items-end" key={message.id}>
                            <div className="flex text-lg">{message.name}</div>
                            {message.text.length > 0 ? (
                                <div className="bg-blue-500 text-white max-w-fit px-3 py-1 border rounded-xl text-lg ">
                                    {message.text}
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                            {message.file ? (
                                <div className="w-1/2">
                                    <img src={message.file} alt="nopic" />
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                        </div>
                    ) : (
                        /*  Message from your friend */
                        <div className="text-sm" key={message.id}>
                            <div className="flex text-lg">{message.name}</div>
                            {message.text.length > 0 ? (
                                <div className="bg-slate-200 text-black max-w-fit px-3 py-1 rounded-xl text-lg">
                                    <p>{message.text}</p>
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                            {message.file ? (
                                <div className="w-1/2">
                                    <img src={message.file} alt="nopic" />
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                        </div>
                    ),
                )}
                {/* <div className="flex absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="relative">
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
                </div> */}

                {/* Trigger when typing message  */}
                <div className="text-xs h-6">
                    <p className="text-base"> {typingStatus}</p>
                </div>
                <div ref={lastMessageRef} />
            </div>
        </>
    );
}

export default ChatBody;
