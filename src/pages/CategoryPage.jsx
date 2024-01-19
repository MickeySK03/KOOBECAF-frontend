import { useEffect } from "react";
import { fetchProductByCategory, resetProductPrice, resetSearchProduct } from "../stores/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllCategory } from "../stores/slices/categorySlice";
import ProductByCategoryContainer from "../features/product/ProductByCategoryContainer";

function CategoryPage() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { categoryData } = useSelector((state) => state.category);
    let categoryId = "";
    const categorySearch = categoryData?.find((el) => el.typeOfCategory.includes(pathname.slice(10)));
    if (categorySearch) {
        categoryId = categorySearch.id;
    }

    useEffect(() => {
        dispatch(fetchAllCategory());
        dispatch(fetchProductByCategory(`${categoryId}`));
        dispatch(resetSearchProduct());
        dispatch(resetProductPrice());
    }, [categoryId]);

    return (
        <>
            <ProductByCategoryContainer />
        </>
    );
}

export default CategoryPage;
