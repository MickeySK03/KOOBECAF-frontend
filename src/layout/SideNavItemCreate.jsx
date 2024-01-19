import Avatar from "../components/Avatar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoUpload from "../features/product/PhotoUpload";
import RequiredContainer from "../features/product/RequiredContainer";
import Button from "../components/Button";
import DescriptionContainer from "../features/product/DescriptionContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import validateSchema from "../utils/validate-schema";
import { itemSchema, vehicleSchema, homeSchema } from "../utils/product-validator";
import {
    createProduct,
    fetchProductByProductId,
    resetInputProduct,
    updateInputProduct,
    updateProduct,
} from "../stores/slices/productSlice";

import Skeleton from "react-loading-skeleton";

function SideNavItemCreate({ header, type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { productId } = useParams();
    const { authUserData } = useSelector((state) => state.auth);
    const [error, setError] = useState({});
    const { inputProduct, productByProductId, loading } = useSelector((state) => state.product);

    const { categoryData } = useSelector((state) => state.category);

    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductByProductId(productId));
        }
    }, [productId]);

    useEffect(() => {
        if (inputProduct.id && productByProductId && productId) {
            const { typeOfCategory } = categoryData?.find((x) => x.id === productByProductId.categoryId);
            dispatch(updateInputProduct({ ...productByProductId, typeOfCategory }));
        } else if (pathname.split("/")[1] === "update") {
            dispatch(updateInputProduct(productByProductId));
        }
    }, [productByProductId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        let newInputProduct = {};

        for (let key in inputProduct) {
            if (inputProduct[key] !== "" && inputProduct[key] !== 0 && inputProduct[key]) {
                newInputProduct[key] = inputProduct[key];
            }
        }

        for (let i = 0; i < inputProduct.productImage.length; i++) {
            formData.append("productImage", inputProduct.productImage[i]);
        }

        formData.append("product", JSON.stringify(newInputProduct));

        let result = {};
        if (pathname === "/create/item") {
            delete newInputProduct.idsToDelete;
            result = validateSchema(itemSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(createProduct({ formData }));
            dispatch(resetInputProduct());
            navigate("/selling");
        }

        if (pathname === "/create/vehicle") {
            delete newInputProduct.idsToDelete;
            delete newInputProduct.categoryId;
            delete newInputProduct.typeOfCategory;
            result = validateSchema(vehicleSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(createProduct({ formData }));
            dispatch(resetInputProduct());
            navigate("/selling");
        }

        if (pathname === "/create/rental") {
            delete newInputProduct.idsToDelete;
            delete newInputProduct.categoryId;
            delete newInputProduct.typeOfCategory;
            result = validateSchema(homeSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(createProduct({ formData }));
            dispatch(resetInputProduct());
            navigate("/selling");
        }

        if (pathname === `/update/item/${productId}`) {
            delete newInputProduct.idsToDelete;
            delete newInputProduct.userId;
            delete newInputProduct.usersId;
            delete newInputProduct.createdAt;
            delete newInputProduct.image;
            delete newInputProduct.id;
            delete newInputProduct.status;
            delete newInputProduct.point;
            result = validateSchema(itemSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(updateProduct({ productId, formData }));
            dispatch(resetInputProduct());
            newInputProduct = {};
            navigate("/selling");
        }

        if (pathname === `/update/vehicle/${productId}`) {
            delete newInputProduct.categoryId;
            delete newInputProduct.id;
            delete newInputProduct.status;
            delete newInputProduct.typeOfCategory;
            delete newInputProduct.idsToDelete;
            delete newInputProduct.image;
            delete newInputProduct.userId;
            delete newInputProduct.usersId;
            delete newInputProduct.createdAt;
            delete newInputProduct.point;

            result = validateSchema(vehicleSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(updateProduct({ productId, formData }));

            dispatch(resetInputProduct());
            newInputProduct = {};
            navigate("/selling");
        }

        if (pathname === `/update/rental/${productId}`) {
            delete newInputProduct.idsToDelete;
            delete newInputProduct.userId;
            delete newInputProduct.usersId;
            delete newInputProduct.createdAt;
            delete newInputProduct.image;
            delete newInputProduct.categoryId;
            delete newInputProduct.id;
            delete newInputProduct.status;
            delete newInputProduct.typeOfCategory;
            delete newInputProduct.point;
            result = validateSchema(homeSchema, newInputProduct);
            if (result) return setError(result);
            await dispatch(updateProduct({ productId, formData }));
            dispatch(resetInputProduct());
            newInputProduct = {};
            navigate("/selling");
        }
    };

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col gap-2 h-screen">
                <div className="sticky h-6"></div>
                <div className="flex flex-col gap-2 px-4">
                    <div className="text-2xl font-bold">{header}</div>
                    <div className="flex gap-3 items-center">
                        {skeleton && !loading ? (
                            <Avatar src={authUserData?.profileImage} />
                        ) : (
                            <div className="flex gap-3 items-center">
                                <Skeleton width={40} height={40} circle={true} />
                                <Skeleton containerClassName="flex-1" height={40} />
                            </div>
                        )}
                        {skeleton && !loading ? (
                            <div>
                                {authUserData?.firstName} {authUserData?.lastName}
                            </div>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <Skeleton containerClassName="flex-1" width={200} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-b-2 mb-2 pb-2"></div>
                <div className="flex flex-col gap-4 overflow-auto h-screen pb-16 px-4">
                    <PhotoUpload />
                    <RequiredContainer type={type} error={error} />
                    <div className="flex flex-col gap-4">
                        <DescriptionContainer error={error} />
                        {inputProduct.id ? (
                            <Button type={"submit"} text={"Update"} />
                        ) : (
                            <Button type={"submit"} text={"Create"} />
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}

export default SideNavItemCreate;
