import { useEffect, useState } from "react";
import { ImBin2 } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal";
import DeleteProductForm from "./DeleteProductForm";
import InputAvailable from "../../components/InputAvailable";
import Skeleton from "react-loading-skeleton";

function ListProductCard({ src, productPrice, productName, status, productDetail, productId }) {
    const navigate = useNavigate();

    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1000);
        return () => clearTimeout(id);
    }, []);

    const handleUpdateClick = async () => {
        if (productDetail.categoryId === 1) {
            navigate(`/update/vehicle/${productDetail.id}`);
        } else if (productDetail.categoryId === 2) {
            navigate(`/update/rental/${productDetail.id}`);
        } else {
            navigate(`/update/item/${productDetail.id}`);
        }
    };

    const statusAvailable = [
        { id: 1, status: "AVAILABLE" },
        { id: 2, status: "SOLD" },
        { id: 3, status: "NOT_AVAILABLE" },
    ];

    return (
        <>
            <div className="w-full h-[180px] bg-white rounded-md my-2 flex px-16">
                {skeleton ? (
                    <div className="aspect-square rounded-md p-3">
                        <img className="h-full object-cover rounded-md" src={src} alt="productImage" />
                    </div>
                ) : (
                    <Skeleton height={170} width={180} enableAnimation={true} />
                )}
                <div className="p-4 w-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-xl font-semibold">
                                {skeleton ? productName : <Skeleton width={200} />}
                            </div>
                            <div className="">
                                {skeleton ? <> &#3647; {productPrice} </> : <Skeleton width={200} />}
                            </div>
                            <div className="text-sm">{skeleton ? <></> : <Skeleton width={200} />}</div>
                        </div>
                        <div className="flex justify-between ">
                            {skeleton ? (
                                <div className="flex">
                                    <InputAvailable
                                        productDetail={productDetail}
                                        productId={productId}
                                        status={status}
                                        data={statusAvailable}
                                        name={"status"}
                                    />
                                </div>
                            ) : (
                                <Skeleton width={290} height={40} />
                            )}

                            <div className="flex gap-6 items-center cursor-pointer">
                                {skeleton ? (
                                    <div onClick={handleUpdateClick} className="text-[1.5rem] text-dark-night">
                                        <FaEdit />
                                    </div>
                                ) : (
                                    <Skeleton width={25} height={25} />
                                )}
                                {skeleton ? (
                                    <div
                                        onClick={() => setIsOpenDelete(true)}
                                        className="text-[1.5rem] text-dark-night"
                                    >
                                        <ImBin2 />
                                    </div>
                                ) : (
                                    <Skeleton width={25} height={25} />
                                )}
                                <Modal
                                    title={"Delete listing"}
                                    open={isOpenDelete}
                                    onClose={() => setIsOpenDelete(false)}
                                >
                                    <DeleteProductForm
                                        productDetail={productDetail}
                                        productId={productId}
                                        onClose={() => setIsOpenDelete(false)}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListProductCard;
