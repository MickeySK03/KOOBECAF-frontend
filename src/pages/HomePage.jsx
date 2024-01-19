import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct, fetchProductByUserId } from "../stores/slices/productSlice";
import { getAccessToken } from "../utils/local-storage";
import { fetchAllCategory } from "../stores/slices/categorySlice";
import ProductContainer from "../features/product/ProductContainer";
import { fetchDataUser, unSubscribe } from "../stores/slices/authSlice";

function HomePage() {
    const dispatch = useDispatch();
    const { authUserData } = useSelector((state) => state.auth);
    useEffect(() => {
        if (getAccessToken()) {
            dispatch(fetchAllProduct());
            dispatch(fetchAllCategory());
            dispatch(fetchDataUser())
                .unwrap()
                .then((res) => {
                    dispatch(fetchProductByUserId(res.user.id));
                });
        }
    }, []);
    if (authUserData?.isSubscribe && authUserData?.endSubscribe) {
        let currentDate = new Date();
        let endSubscribeDate = new Date(authUserData?.endSubscribe);
        if (currentDate > endSubscribeDate) {
            dispatch(unSubscribe());
        }
    }
    
    return (
        <>
            <ProductContainer />
        </>
    );
}

export default HomePage;
