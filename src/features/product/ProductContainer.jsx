import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addPath } from "../../utils/local-storage";
import NotFoundProduct from "../../components/NotFoundProduct";
import ProductCard from "./ProductCard";

function ProductContainer() {
    const { pathname } = useLocation();
    const { productData, loading, searchProduct } = useSelector((state) => state.product);
    let product = productData?.filter((el) =>
        el.productName.toLowerCase().includes(searchProduct.toLowerCase().trim()) ? el : null,
    );

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    <div className="flex w-full bg-second-light h-screen">
                        <div className="min-w-[360px]"></div>
                        <div className="flex flex-col w-full bg-main-light">
                            <div className="flex justify-start py-6 px-12">
                                <div className="text-xl font-semibold">Today's picks</div>
                            </div>
                            {product && product.length > 0 ? (
                                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-12 bg-main-light">
                                    {product?.map((data) =>
                                        data.status === "AVAILABLE" ? (
                                            <Link
                                                key={data.id}
                                                onClick={() => addPath(pathname)}
                                                to={`/product/${data.id}`}
                                                state={{ productDetail: data }}
                                            >
                                                <ProductCard
                                                    src={data.image[0]?.image}
                                                    productPrice={data.productPrice}
                                                    productName={data.productName}
                                                    productDetail={data}
                                                />
                                            </Link>
                                        ) : null,
                                    )}
                                </div>
                            ) : (
                                <NotFoundProduct />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ProductContainer;
