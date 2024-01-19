import { Link } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import fbmessageIncon from "../../src/assets/Images/fbmesIcon.png";

function MessageInbox() {
    return (
        <>
            <div className="flex gap-2 pb-4">
                <div className="sticky">
                    <Link to={`/inbox`}>
                        <img src={fbmessageIncon} width={50} height={50} />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default MessageInbox;
