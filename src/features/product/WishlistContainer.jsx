import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addPath } from "../../utils/local-storage";
import ProductCard from "./ProductCard";

function WishlistContainer() {
    const { pathname } = useLocation();
    const { wishlistProduct, loading } = useSelector((state) => state.product);

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    {wishlistProduct?.map((data) => (
                        <Link
                            key={data.id}
                            onClick={() => addPath(pathname)}
                            to={`/product/${data.id}`}
                            state={{ productDetail: data.productsId }}
                        >
                            <ProductCard
                                key={data.id}
                                src={data.productsId.image[0].image}
                                productPrice={data.productsId.productPrice}
                                productName={data.productsId.productName}
                                productDetail={data.productsId}
                            />
                        </Link>
                    ))}
                </>
            )}
        </>
    );
}

export default WishlistContainer;
