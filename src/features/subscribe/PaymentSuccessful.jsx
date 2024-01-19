import { useEffect } from "react";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createSubscribe } from "../../stores/slices/paymentSlice";
import Button from "../../components/Button";

export default function paymentSuccessful() {
    const dispatch = useDispatch();
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const transactionId = query.get("transactionId");
        if (query.get("success")) {
            dispatch(createSubscribe(transactionId));
        }
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                <div className="mt-44"></div>
                <div className="text-[8rem] text-green-600 pb-2">
                    <IoMdCheckmarkCircleOutline />
                </div>
                <div className="font-semibold text-3xl">Congratulations!</div>
                <div className="pt-2">Your payment was successfully processed.</div>
                <div>Thank you for choosing our service and you can now enjoy the benefits of your purchase.</div>
                <div className="pt-6">
                    <Link to="/">
                        <Button text={"Back to Homepage"}></Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
