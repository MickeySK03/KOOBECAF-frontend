import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProductPrice } from "../stores/slices/productSlice";
import Button from "../components/Button";
import Search from "../features/filter/Search";
import Categories from "../features/filter/Categories";
import InputForm from "../components/InputForm";
import { useEffect, useState } from "react";
import validateSchema from "../utils/validate-schema";
import { filterPriceSchema } from "../utils/product-validator";
import InputErrorMessage from "../features/auth/InputErrorMessage";
import Skeleton from "react-loading-skeleton";

function SideNavCategory() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { productPrice } = useSelector((state) => state.product);
    const nameTagSearch = pathname.slice(10).replace(/_/g, " ");
    const [error, setError] = useState({});
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        setError({});
    }, [nameTagSearch]);

    const onChangeInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const product = {};
        let result = {};

        for (let key in productPrice) {
            if (key === fieldName) {
                product[key] = fieldValue;
            } else {
                product[key] = productPrice[key];
            }
        }
        result = validateSchema(filterPriceSchema, product);
        if (result) {
            setError(result);
        } else {
            setError({});
        }
        dispatch(setProductPrice({ fieldName, fieldValue }));
    };

    return (
        <>
            <div className="flex flex-col gap-2 pb-4 border-b-2">
                <div className="sticky">
                    <Search div={"pt-10"} nameTagSearch={`${nameTagSearch}`} />
                </div>
                <div className="flex justify-center w-full">
                    <Link className="w-full px-20" to={"/create"}>
                        {skeleton ? <Button text={"Create new listing"} /> : <Skeleton width={200} height={45} />}
                    </Link>
                </div>
            </div>

            <div className="flex flex-col p-4">
                <div className="text-lg font-semibold">Filters</div>
                {skeleton ? (
                    <div className="flex justify-between items-center px-4">
                        <div className="w-32">
                            <InputForm
                                name="minPrice"
                                placeholder="Min"
                                className="pt-0"
                                onChange={onChangeInput}
                                value={productPrice.minPrice}
                                isError={error.productPrice}
                            />

                            {error.minPrice && <InputErrorMessage message={"Minimum price must be a number"} />}
                        </div>

                        <div>
                            <div>To</div>
                        </div>
                        <div className="w-32">
                            <InputForm
                                name="maxPrice"
                                placeholder="Max"
                                className="pt-0"
                                onChange={onChangeInput}
                                value={productPrice.maxPrice}
                                isError={error.productPrice}
                            />

                            {error.maxPrice && <InputErrorMessage message={"Maximum price must be a number"} />}
                        </div>
                    </div>
                ) : (
                    <Skeleton width={320} height={50} />
                )}
            </div>

            <div className="border" />

            <div className="flex flex-col gap-2 overflow-auto h-screen pb-52 px-4">
                <Categories />
            </div>
        </>
    );
}

export default SideNavCategory;
