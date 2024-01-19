import DeleteContainer from "./DeleteContainer";

function DeleteProductForm({ productId, productDetail, onClose }) {
    return (
        <>
            <div>Are you sure you want to delete this listing?</div>
            <DeleteContainer productId={productId} productDetail={productDetail} onClose={onClose} />
        </>
    );
}

export default DeleteProductForm;
