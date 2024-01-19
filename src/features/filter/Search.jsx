import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchProduct, setSearchProductProfile } from "../../stores/slices/productSlice";
import SearchInput from "./SearchInput";

function Search({ nameTagSearch = "Marketplace", className, div, placeholder = "ค้นหา Marketplace", type }) {
    const dispatch = useDispatch();
    const { searchProduct, searchProductProfile } = useSelector((state) => state.product);
    const onChangeInput = (e) => {
        const fieldValue = e.target.value;
        if (type === "profile") {
            dispatch(setSearchProductProfile({ fieldValue }));
        } else {
            dispatch(setSearchProduct({ fieldValue }));
        }
    };

    return (
        <>
            <div className={`w-full relative px-4 ${div}`}>
                <div className="flex justify-between">
                    <div className="text-2xl font-bold pl-2">{nameTagSearch}</div>
                </div>
                <SearchInput
                    placeholder={placeholder}
                    onChange={onChangeInput}
                    value={type === "profile" ? searchProductProfile : searchProduct}
                    className={className}
                />
            </div>
        </>
    );
}

export default Search;
