import { Link } from "react-router-dom";
import { MdAnnouncement } from "react-icons/md";
import Button from "../../components/Button";

export default function PaymentFailed() {
    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                <div className="mt-44"></div>
                <div className="text-[8rem] text-red-600 pb-2">
                    <MdAnnouncement />
                </div>
                <div className="font-semibold text-3xl">Transaction Failed</div>
                <div className="pt-2">We regret to inform you that your transaction has failed.</div>
                <div>Please review your payment details and ensure they are accurate.</div>

                <div className="pt-6">
                    <Link to="/">
                        <Button text={"Back to Homepage"}></Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
