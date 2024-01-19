import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { subscribe } from "../stores/slices/paymentSlice";
import Button from "../components/Button";

function SubscribePage() {
    const dispatch = useDispatch();
    const handleSubmitCheckout = (e) => {
        e.preventDefault();
        dispatch(subscribe(e.target.name)).then((res) => window.location.replace(res.payload.url));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center h-full mt-16">
                <div className="text-5xl font-fontHeader text-main-dark ">KOOBECAF Premium</div>
                <div className="text-2xl">Products will be at the top and able to use feature filter map by radius</div>
            </div>

            <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center w-96 mt-16">
                    <div className="rounded-lg bg-white shadow-2xl border shadow-main-dark/50">
                        <div className="flex  items-center text-xl border-b px-8 py-4">
                            <div className="pr-3 text-[2rem]">
                                <BsFillPersonFill />
                            </div>

                            <div className="text-2xl">Individual</div>
                        </div>
                        <div className="px-8 py-4">
                            <div className="text-xl ">Monthly</div>

                            <div className="font-semibold text-2xl py-2">THB 159.00/month</div>

                            <div className="">
                                You will be charged the monthly subscription fee starting on the first billing date. The
                                subscription will not automatically renew each month. If you wish to continue, please
                                subscribe again at your convenience.
                            </div>
                        </div>
                        <div className="flex justify-center pb-4">
                            <div className="flex justify-center w-1/2">
                                <Button text={"Subscribe"} name={"standard_monthly"} onClick={handleSubmitCheckout} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-96 mt-16 ">
                    <div className="rounded-lg bg-white shadow-2xl border shadow-main-dark/50">
                        <div className="flex  items-center text-xl border-b px-8 py-4">
                            <div className="pr-3 text-[2rem]">
                                <BsFillPersonFill />
                            </div>

                            <div className="text-2xl">Individual</div>
                        </div>

                        <div className="px-8 py-4">
                            <div className="text-xl ">Annual</div>
                            <div className="font-semibold text-2xl py-2">THB 1,590.00/year</div>
                            <div className="">
                                You will be charged the monthly subscription fee starting on the first billing date. The
                                subscription will not automatically renew each month. If you wish to continue, please
                                subscribe again at your convenience.
                            </div>
                        </div>
                        <div className="flex justify-center pb-4">
                            <div className="flex justify-center w-1/2">
                                <Button text={"Subscribe"} name={"standard_yearly"} onClick={handleSubmitCheckout} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscribePage;
