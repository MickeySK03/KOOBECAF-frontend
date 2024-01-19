import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { subscribe } from "../../stores/slices/paymentSlice";

function SubscribeContainer() {
    const dispatch = useDispatch();
    const handleSubmitCheckout = (e) => {
        e.preventDefault();
        dispatch(subscribe("standard_monthly")).then((res) => window.location.replace(res.payload.url));
    };
    return (
        <>
            <div className="flex justify-center pb-4">
                <div className="flex justify-center w-1/2">
                    <Button text={"Subscribe"} onClick={handleSubmitCheckout} />
                </div>
            </div>
        </>
    );
}

export default SubscribeContainer;
