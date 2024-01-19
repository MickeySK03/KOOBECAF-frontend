import { fetchAllProduct, filterByLocation, setInputSubLocation } from "../../stores/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/InputForm";
import Autocomplete from "../../components/Autocomplete";
import SubscriptGoogleMap from "../../features/subscribe/SubscribeGoogleMap";
import Button from "../../components/Button";
import { useEffect } from "react";

export default function ChangeLocation({ onClose }) {
    const { inputLocation, inputProduct, inputSubLocation } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProduct());
        const latitude = inputProduct.latitude;
        const longitude = inputProduct.longitude;
        dispatch(filterByLocation({ latitude, longitude }));
    }, [inputSubLocation]);

    const handleApply = () => {
        dispatch(setInputSubLocation(inputLocation));
        onClose();
        const latitude = inputProduct.latitude;
        const longitude = inputProduct.longitude;
        dispatch(filterByLocation({ latitude, longitude }));
    };

    const handleOnClick = () => {
        onClose();
    };

    return (
        <>
            <div className="bg-white rounded-lg">
                <div className="flex flex-col items-center py-4 rounded-t-lg ">
                    <div className="relative">
                        <p className="text-2xl font-bold">Change Location</p>
                        <div
                            className="absolute bottom-1 left-[370px] text-2xl hover:text-[#959595] cursor-pointer"
                            onClick={handleOnClick}
                        >
                            X
                        </div>
                    </div>
                    <div className="border w-full" />
                </div>

                <div className=" px-4 pb-4 gap-y-4">
                    <div className="gap-y-4">
                        <p>Search by city</p>
                        <Autocomplete placeholder={"Location"} className={"rounded-md"} />
                        <InputForm
                            styles="focus:border-1 border-main focus:ring-2 focus:ring-main-dark rounded-md"
                            placeholder="Radius 5 km"
                        />
                        <div className="py-4">
                            <SubscriptGoogleMap />
                        </div>
                    </div>
                    <div className="border w-full" />
                    <div className="flex justify-end">
                        <div className="w-20 pt-4">
                            <Button
                                onClick={handleApply}
                                text="Apply"
                                className="rounded-md text-white bg-main hover:bg-main-dark text-sm font-semibold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
