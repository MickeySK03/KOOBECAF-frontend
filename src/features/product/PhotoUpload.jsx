import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setInputProduct } from "../../stores/slices/productSlice";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function PhotoUpload() {
    const dispatch = useDispatch();
    const { inputProduct, errorMessage, loading } = useSelector((state) => state.product);

    const idsToDelete = inputProduct.idsToDelete || [];

    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    const onChangeInput = (e) => {
        if (inputProduct.productImage?.length !== 0) {
            const fieldName = e.target.name;
            const fieldValue = [...inputProduct.productImage, ...e.target.files];
            dispatch(setInputProduct({ fieldName, fieldValue }));
        } else {
            const fieldName = e.target.name;
            const fieldValue = e.target.files;
            dispatch(setInputProduct({ fieldName, fieldValue }));
        }
    };

    let newFile = [];

    if (inputProduct.productImage) {
        newFile = [...newFile, ...Array.from(inputProduct.productImage)];
    }
    if (inputProduct.image) {
        newFile = [...newFile, ...inputProduct.image];
    }

    const amountPhoto = newFile?.length;
    const deleteImage = (index, id) => {
        let fieldName = "productImage";
        const productImageAmount = Array.from(inputProduct.productImage);
        let fieldValue = productImageAmount.filter((x, idx) => idx !== index);
        if (fieldValue.length === productImageAmount.length) {
            fieldName = "image";
            fieldValue = inputProduct.image.filter((x) => x.id !== id);
        }

        dispatch(setInputProduct({ fieldName, fieldValue }));
        if (newFile[index].id) {
            const fieldName = "idsToDelete";
            const fieldValue = [...idsToDelete, newFile[index].id];
            dispatch(setInputProduct({ fieldName, fieldValue }));
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">Photo Upload</div>
                {skeleton ? (
                    <div className="flex flex-col">
                        <div className={`${errorMessage ? "text-error" : ""}`}>Photos - {amountPhoto}/5</div>

                        {newFile.length > 0 && (
                            <>
                                <div className="flex gap-1 flex-wrap w-[300px]">
                                    {newFile.map((file, idx) => (
                                        <div key={idx}>
                                            {skeleton && !loading ? (
                                                <div
                                                    className={`relative rounded-md border-2 ${
                                                        errorMessage ? "border-error/50" : ""
                                                    } w-24`}
                                                >
                                                    <img
                                                        className="w-24 aspect-square rounded-md hover:brightness-50"
                                                        src={file.image || URL.createObjectURL(file)}
                                                        alt=""
                                                    />

                                                    <div
                                                        onClick={() => {
                                                            deleteImage(idx, file.id);
                                                        }}
                                                        className={`flex justify-center absolute top-0 right-0 w-7 aspect-square rounded-full bg-white border-2 ${
                                                            errorMessage ? "border-error/50" : "border-slate-300"
                                                        } hover:bg-slate-200`}
                                                    >
                                                        x
                                                    </div>
                                                </div>
                                            ) : (
                                                <Skeleton width={94} height={94} square={true} />
                                            )}
                                        </div>
                                    ))}
                                    {skeleton && !loading ? (
                                        <label
                                            className={`flex flex-col gap-2 justify-center items-center border-2 ${
                                                errorMessage ? "border-error/50" : ""
                                            } bg-white rounded-md h-24 w-24 cursor-pointer`}
                                        >
                                            <div className="flex text-xl justify-center items-center bg-[#d9d9d9] w-10 aspect-square rounded-full">
                                                <FaCamera />
                                            </div>
                                            <div className="text-sm font-semibold">Add Photo</div>
                                            <input
                                                name="productImage"
                                                onChange={onChangeInput}
                                                type="file"
                                                className="hidden"
                                                multiple
                                            />
                                        </label>
                                    ) : (
                                        <Skeleton width={90} height={90} square={true} />
                                    )}
                                </div>
                                {errorMessage && <div className="text-error">You can add up to 5 photos.</div>}
                            </>
                        )}

                        {newFile.length === 0 && (
                            <>
                                <label className="flex flex-col gap-2 justify-center items-center border-2 bg-white rounded-md h-48 cursor-pointer">
                                    <div className="flex text-2xl justify-center items-center bg-[#d9d9d9] w-12 aspect-square rounded-full">
                                        <FaCamera />
                                    </div>
                                    <div className="font-semibold">Add Photo</div>
                                    <input
                                        name="productImage"
                                        onChange={onChangeInput}
                                        type="file"
                                        className="hidden"
                                        multiple
                                    />
                                </label>
                            </>
                        )}
                    </div>
                ) : (
                    <Skeleton containerClassName="flex-1" height={180} />
                )}
            </div>
        </>
    );
}

export default PhotoUpload;
