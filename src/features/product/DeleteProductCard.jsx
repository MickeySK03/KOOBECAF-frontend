import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProductByUserId } from "../../stores/slices/productSlice";

function DeleteProductCard({ productDetail, productId, onClose }) {
    const dispatch = useDispatch();
    const { authUserData } = useSelector((state) => state.auth);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex">
                <div className="aspect-square rounded-md p-3">
                    <img
                        className="h-20 w-20 object-cover rounded-md"
                        src={productDetail.image[0].image}
                        alt="productImage"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="text-md font-semibold">{productDetail.productName}</div>
                    <div className="text-sm">&#3647; {productDetail.productPrice}</div>
                </div>
            </div>
            <hr className="border" />
            <div className="flex justify-end">
                <div className="flex px-3">
                    <Button className="bg-main-light hover:bg-main-dark" onClick={onClose} text={"Cancel"} />
                </div>
                <div className="flex">
                    <Button
                        text={"Delete"}
                        type={"submit"}
                        onClick={() => {
                            dispatch(deleteProduct(`${productId}`)).then((res) =>
                                dispatch(fetchProductByUserId(authUserData?.id)),
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default DeleteProductCard;
