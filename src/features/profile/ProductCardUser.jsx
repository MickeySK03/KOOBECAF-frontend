import { useEffect, useState } from "react";
import defaultProduct from "../../assets/Images/hero-img_copy.jpg";
import Skeleton from "react-loading-skeleton";

export default function ProductCardUser({ src = defaultProduct, productPrice = "123", productName = "aaa" }) {
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);
    return (
        <>
            {skeleton ? (
                <div className="w-full bg-white aspect-square rounded-md shadow-main shadow-md">
                    <img className="h-full object-cover rounded-t-md" src={src} alt="" />
                    <div className="p-1 leading-6">
                        <div className="font-semibold text-[16px] ">&#3647;{productPrice}</div>
                        <div className="truncate text-[16px]">{productName}</div>
                    </div>
                </div>
            ) : (
                <Skeleton containerClassName="flex-1" height={200} />
            )}
        </>
    );
}
