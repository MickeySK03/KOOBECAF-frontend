import { FaInbox } from "react-icons/fa";
import ListChatContainer from "../features/chat/ListChatContainer";

function InboxPage() {
    return (
        <>
            <div className="flex flex-col bg-main-light ">
                <div className="flex">
                    <div className="min-w-[360px]" />
                    <div className="flex items-center w-full">
                        <div className="px-6 pt-2 w-full">
                            <div className="flex justify-center gap-5 p-6 rounded-md bg-main-dark shadow-md">
                                <div className="flex text-4xl text-white">
                                    <FaInbox />
                                </div>
                                <div className="text-center text-3xl text-white ">INBOX</div>
                            </div>

                            <div className="flex flex-col pt-2">
                                <ListChatContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InboxPage;
