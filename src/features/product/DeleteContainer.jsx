import { useSelector } from "react-redux";
import DeleteProductCard from "./DeleteProductCard";

function DeleteContainer({ productDetail, productId, onClose }) {
    const { loading } = useSelector((state) => state.product);

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    <DeleteProductCard productDetail={productDetail} productId={productId} onClose={onClose} />
                </>
            )}
        </>
    );
}

export default DeleteContainer;
