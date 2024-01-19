import { useEffect, useState } from "react";
import { fetchAllCategory } from "../stores/slices/categorySlice";
import { useDispatch } from "react-redux";
import { fetchDataUser } from "../stores/slices/authSlice";
import { fetchAllProduct, fetchProductByUserId } from "../stores/slices/productSlice";
import item from "../assets/Images/item.png";
import vehicle from "../assets/Images/vehicle.png";
import home from "../assets/Images/home.png";
import Skeleton from "react-loading-skeleton";

import CreateProductCard from "../features/product/CreateProductCard";

function CreateProductPage() {

    const dispatch = useDispatch();
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        dispatch(fetchAllCategory());
        dispatch(fetchAllProduct());
        dispatch(fetchDataUser())
            .unwrap()
            .then((res) => {
                dispatch(fetchProductByUserId(res.user.id));
            });
    }, []);

    const menu = [
        {
            id: 1,
            src: item,
            header: <div className="font-semibold">Item for Sale</div>,
            to: "/create/item",
            content: (
                <>
                    Create a single listing for <br /> one or more items to sell.
                </>
            ),
        },
        {
            id: 2,
            src: vehicle,
            header: <div className="font-semibold">Vehicle for Sale</div>,
            to: "/create/vehicle",
            content: (
                <>
                    Sell a car, truck or <br /> other type of vehicle.
                </>
            ),
        },
        {
            id: 3,
            src: home,
            header: <div className="font-semibold">Home for Sale or Rent</div>,
            to: "/create/rental",
            content: (
                <>
                    List a house or apartment
                    <br /> for sale or rent.
                </>
            ),
        },
    ];

    return (
        <>
            <div className="flex h-screen w-full bg-main-light">
                <div className="min-w-[300px]"></div>
                <div className="flex justify-center items-center w-full">
                    <div className="flex gap-3 flex-col">
                        {skeleton ? (
                            <div className="text-xl font-bold">Choose Listing Type</div>
                        ) : (
                            <Skeleton width={180} />
                        )}

                        <div className="grid grid-cols-3 m-auto gap-8 w-[600px] h-[222px]">
                            {menu.map((x) => (
                                <CreateProductCard key={x.id} {...x} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProductPage;
