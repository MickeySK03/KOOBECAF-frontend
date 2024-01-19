import { Button } from "antd";
import { Link } from "react-router-dom";

function ListChatCard({ src, productName, firstName, lastName, productId, userId, productDetail, productPrice }) {
    return (
        <Link to={`/messager/seller/${productId}/${userId}`} state={{ productDetail, userId }}>
            <div className="flex w-full h-[200px] bg-white rounded-md my-2 py-4 px-8 gap-20 shadow-md">
                <div className="aspect-square rounded-md ">
                    <img className="h-full object-cover rounded-md " src={src} alt="productImage" />
                </div>

                <div className="flex items-center  w-full ">
                    <div className="flex flex-col">
                        <div className="text-2xl font-bold">
                            {firstName} {lastName}
                        </div>
                        <div className="text-lg font-semibold">{productName}</div>
                        <div>&#3647; {productPrice}</div>
                    </div>
                </div>

                {userId !== productDetail.userId ? (
                    <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center w-[150px] text-lg bg-second rounded-md p-2 text-white">
                            Selling Item
                        </div>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
        </Link>
    );
}

export default ListChatCard;
