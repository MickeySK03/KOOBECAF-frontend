import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/local-storage";
import { fetchWishlist } from "../stores/slices/productSlice";
import { useEffect } from "react";
import WishlistContainer from "../features/product/WishlistContainer";

function WishlistPage() {
    const dispatch = useDispatch();
    const { wishlistProduct } = useSelector((state) => state.product);

    useEffect(() => {
        if (getAccessToken()) {
            dispatch(fetchWishlist());
        }
    }, []);

    return (
        <>
            <div className="flex w-full bg-second-light">
                <div className="min-w-[360px]"></div>
                <div className="flex flex-col w-full bg-white mt-16">
                    {wishlistProduct?.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col items-center mt-80">
                                <div className="pt-5 text-xl">Looks like you don't have any wishlist items yet.</div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-12 px-12 bg-white mt-10">
                            <WishlistContainer />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default WishlistPage;
