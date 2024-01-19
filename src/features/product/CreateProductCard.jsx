import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function CreateProductCard({ src, header, content, to }) {
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    return (
        <>
            <Link
                to={to}
                className="flex flex-col justify-center items-center gap-2 bg-white shadow-md shadow-main rounded-lg"
            >
                {skeleton ? (
                    <div className="w-16 bg-blue-200 aspect-square rounded-full">
                        <img src={src} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                ) : (
                    <Skeleton width={64} height={64} circle={true} />
                )}
                <div className="mt-1 text-sm text-gray-500">{skeleton ? header : <Skeleton width={100} />}</div>
                <div className="mt-1 text-sm text-gray-500">
                    {skeleton ? content : <Skeleton width={150} count={2} />}
                </div>
            </Link>
        </>
    );
}

export default CreateProductCard;
