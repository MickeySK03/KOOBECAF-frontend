import React from "react";

function ChatBar({ productDetail }) {
    return (
        <div className="w-full h-[100px] bg-white rounded-md flex pl-24 border border-dark-night">
            <div className="aspect-square rounded-md p-3">
                <img
                    className="h-full object-cover rounded-md"
                    src={productDetail.image[0]?.image}
                    alt="productImage"
                />
            </div>
            <div className="w-full">
                <div className="flex justify-evenly items-center h-full">
                    <div className=" text-xl font-semibold ">{productDetail.productName}</div>
                    <div className="text-xl">&#3647; {productDetail.productPrice}</div>
                    <div
                        className={`text-white w-72 text-xl rounded-md py-2 px-3 ${
                            productDetail.status === "AVAILABLE"
                                ? "bg-available"
                                : productDetail.status === "SOLD"
                                ? "bg-error-light"
                                : "bg-second"
                        } `}
                    >
                        {productDetail.status}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBar;
