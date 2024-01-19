import { useSelector } from "react-redux";
import ListProductCard from "./ListProductCard";
import NotFoundProduct from "../../components/NotFoundProduct";

function ListProductContainer() {
    const { productByUserId, searchProduct, loading } = useSelector((state) => state.product);

    let product = productByUserId;
    if (searchProduct.length !== 0) {
        product = productByUserId?.filter((el) =>
            el.productName.toLowerCase().includes(searchProduct.toLowerCase().trim()) ? el : null,
        );
    }

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    {product && product?.length > 0 ? (
                        product?.map((data) => (
                            <ListProductCard
                                key={data.id}
                                src={data?.image[0]?.image}
                                productPrice={data.productPrice}
                                productId={data.id}
                                productDetail={data}
                                productName={data.productName}
                                status={data.status}
                            />
                        ))
                    ) : (
                        <NotFoundProduct />
                    )}
                </>
            )}
        </>
    );
}

export default ListProductContainer;
