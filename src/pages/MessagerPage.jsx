import React, { useEffect, useRef, useState } from "react";
import ChatBar from "../components/chat/ChatBar";
import ChatBody from "../components/chat/ChatBody";
import ChatFooter from "../components/chat/ChatFooter";
import socket from "../config/socket-config";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getAllMessage } from "../stores/slices/chatSlice";

function MessagerPage() {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState("");
    const lastMessageRef = useRef(null);
    const { state } = useLocation();
    const { authUserData } = useSelector((state) => state?.auth);
    const { allMessage } = useSelector((state) => state.chat);

    const params = useParams();
    const productId = params.productId;
    const receiverId = params.receiverId;
    useEffect(() => {
        dispatch(getAllMessage({ productId, receiverId }));
    }, []);

    useEffect(() => {
        setMessages(
            allMessage?.map((data) => ({
                id: data.id,
                name: data.requester.firstName,
                text: data.message,
                senderId: data.requesterId,
                receiverId: data.receiverId,
                productId: data.productId,
                date: data.date,
            })),
        );
    }, [allMessage]);

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessages((messages) => [...messages, data]);
        });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off("receiveMessage");
        };
    }, [socket, messages]);

    useEffect(() => {
        // scroll to buttom after so many message
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        socket.on("typingResponse", (data) => {
            setTypingStatus(data);
        });
        socket.on("receiveMessage", (data) => {
            if (data.name !== authUserData?.firstName) {
                setTypingStatus("");
            }
        });
        return () => {
            socket.off("typingResponse");
            socket.off("receiveMessage");
        };
    }, [socket]);

    return (
        <div className="flex w-full mt-16">
            <div className="flex w-full pt-4">
                <div className="min-w-[360px]"></div>
                <div className="flex flex-col justify-center items-center w-full h-full bg-main-light">
                    <div className="w-4/5">
                        <ChatBar socket={socket} authUserData={authUserData} productDetail={state.productDetail} />
                    </div>
                    <div className="w-4/5">
                        <ChatBody
                            messages={messages}
                            lastMessageRef={lastMessageRef}
                            typingStatus={typingStatus}
                            authUserData={authUserData}
                        />
                        <ChatFooter
                            socket={socket}
                            setTypingStatus={setTypingStatus}
                            authUserData={authUserData}
                            productDetail={state.productDetail}
                            setMessages={setMessages}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagerPage;
