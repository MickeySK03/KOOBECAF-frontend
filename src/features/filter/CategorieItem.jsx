import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

function CategorieItem({ icons, title, to, isActive, onClick }) {
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    return (
        <>
            {to ? (
                <Link to={to}>
                    {skeleton ? (
                        <div
                            className={`flex gap-4 hover:bg-second/40 rounded-lg p-2 group ${
                                isActive && "bg-second/40"
                            }`}
                        >
                            <div
                                className={`flex justify-center items-center text-xl w-10 aspect-square rounded-full ${
                                    isActive ? "group-hover:bg-error-light/50" : "group-hover:bg-main"
                                }  bg-[#d9d9d9] group-hover:border-[3px] group-hover:text-white/80 ${
                                    isActive && "bg-error-light/50 border-[3px] text-white/80 border-[#d9d9d9]"
                                }`}
                            >
                                {icons}
                            </div>
                            <div className="self-center font-medium">{title}</div>
                        </div>
                    ) : (
                        <div className="flex gap-4 my-[6px] mx-2">
                            <Skeleton width={40} height={40} circle={true} />
                            <Skeleton containerClassName="flex-1" height={40} />
                        </div>
                    )}
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={`w-full flex gap-4 hover:bg-second/40 rounded-lg p-2 group ${
                        isActive && "bg-second/40"
                    }`}
                >
                    {skeleton ? (
                        <>
                            <div
                                className={`flex justify-center items-center text-xl w-10 aspect-square rounded-full ${
                                    isActive ? "group-hover:bg-error-light/50" : "group-hover:bg-main"
                                }  bg-[#d9d9d9] group-hover:border-[3px] group-hover:text-white/80 ${
                                    isActive && "bg-error-light/50 border-[3px] text-white/80 border-[#d9d9d9]"
                                }`}
                            >
                                {icons}
                            </div>
                            <div className="self-center font-medium">{title}</div>
                        </>
                    ) : (
                        <div className="flex">
                            <Skeleton width={40} height={40} circle={true} />
                            <Skeleton containerClassName="flex-1" height={40} />
                        </div>
                    )}
                </button>
            )}
        </>
    );
}

export default CategorieItem;
