import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputProduct, setInputProductCategory } from "../../stores/slices/productSlice";
import { DatePicker, ConfigProvider } from "antd";
import { fetchAllCategory } from "../../stores/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import InputDropdown from "../../components/InputDropdown";
import InputErrorMessage from "../auth/InputErrorMessage";
import Autocomplete from "../../components/Autocomplete";
import Skeleton from "react-loading-skeleton";

function RequiredContainer({ type, error }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authUserData } = useSelector((state) => state.auth);
    const { categoryData } = useSelector((state) => state.category);
    const { inputProduct, loading } = useSelector((state) => state.product);
    const [skeleton, setSkeleton] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [authUserData]);

    const vehicleTypes = [
        { id: 1, vehicleType: "CAR" },
        { id: 2, vehicleType: "TRUCK" },
        { id: 3, vehicleType: "MOTORCYCLE" },
        { id: 4, vehicleType: "POWERSPORT" },
        { id: 5, vehicleType: "RV" },
        { id: 6, vehicleType: "CAMPER" },
        { id: 7, vehicleType: "TRAILER" },
        { id: 8, vehicleType: "BOAT" },
        { id: 9, vehicleType: "COMMERCIAL" },
        { id: 10, vehicleType: "INDUSTRIAL" },
    ];

    const homeTypes = [
        { id: 1, homeType: "FLAT" },
        { id: 2, homeType: "HOUSE" },
        { id: 3, homeType: "TOWNHOME" },
    ];

    const homePropertys = [
        { id: 1, homeProperty: "RENT" },
        { id: 2, homeProperty: "SALE" },
    ];

    let newCategoryData = null;

    if (type.split("/")[1] + type.split("/")[2] === "updateitem") {
        let categoryDataUpdate = categoryData?.filter((x) => x.id !== 1 && x.id !== 2);
        newCategoryData = Array.isArray(categoryDataUpdate)
            ? [...categoryDataUpdate]
            : [{ id: 0, typeOfCategory: "Category" }];
    } else {
        newCategoryData = Array.isArray(categoryData)
            ? [{ id: 0, typeOfCategory: "Category" }, ...categoryData]
            : [{ id: 0, typeOfCategory: "Category" }];
    }

    const newVehicleTypeData = [{ id: 0, vehicleType: "Vehicle type" }, ...vehicleTypes];
    const newHomeTypeData = [{ id: 0, homeType: "Property type" }, ...homeTypes];
    const newHomePropertyData = [{ id: 0, homeProperty: "Home for Sale or Rent" }, ...homePropertys];

    const onChangeInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        dispatch(setInputProduct({ fieldName, fieldValue }));
    };

    const onChangeInputYear = (date, dateString) => {
        const fieldName = "vehicleYears";
        const fieldValue = dateString;
        dispatch(setInputProduct({ fieldName, fieldValue }));
    };

    const onChangeInputCategory = (e) => {
        const { id } = newCategoryData.find((x) => x.typeOfCategory === e.target.value);
        const fieldValue = e.target.value;
        dispatch(setInputProductCategory({ id, fieldValue }));
        if (id === 1) {
            navigate("/create/vehicle");
        }
        if (id === 2) {
            navigate("/create/rental");
        }
    };

    let inputForm = (
        <>
            {skeleton && !loading ? (
                <InputForm
                    value={inputProduct.productName}
                    onChange={onChangeInput}
                    name={"productName"}
                    placeholder={"Title"}
                />
            ) : (
                <Skeleton containerClassName="flex-1" height={50} />
            )}
            {error.productName && <InputErrorMessage message={"Title is required"} />}

            {skeleton && !loading ? (
                <InputForm
                    value={inputProduct.productPrice}
                    onChange={onChangeInput}
                    name={"productPrice"}
                    placeholder={"Price"}
                />
            ) : (
                <Skeleton containerClassName="flex-1" height={50} />
            )}

            {error.productPrice && <InputErrorMessage message={"Price is required, should be a number."} />}

            {skeleton && !loading ? (
                <InputDropdown
                    value={inputProduct.typeOfCategory}
                    data={newCategoryData}
                    onChange={onChangeInputCategory}
                    name={"typeOfCategory"}
                />
            ) : (
                <Skeleton containerClassName="flex-1" height={50} />
            )}
            {error.typeOfCategory && <InputErrorMessage message={"Category is required"} />}

            {skeleton && !loading ? (
                <Autocomplete placeholder={"Location"} />
            ) : (
                <Skeleton containerClassName="flex-1" height={50} />
            )}
            {error.latitude && <InputErrorMessage message={"Location is required"} />}
        </>
    );

    if (type === "/create/vehicle" || type.includes("/update/vehicle")) {
        inputForm = (
            <>
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.productName}
                        onChange={onChangeInput}
                        name={"productName"}
                        placeholder={"Title"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.productName && <InputErrorMessage message={"Title is required."} />}
                {skeleton && !loading ? (
                    <InputDropdown
                        value={inputProduct.vehicleType}
                        data={newVehicleTypeData}
                        onChange={onChangeInput}
                        name={"vehicleType"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.vehicleType && <InputErrorMessage message={"Vehicle type is required."} />}
                {skeleton && !loading ? (
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextPlaceholder: "#6b7280",
                            },
                        }}
                    >
                        <DatePicker
                            className="mt-4 rounded-full outline-none border-2 px-4 py-[9px]  focus:border-1 border-main focus:ring-2 focus:ring-main-dark"
                            onChange={onChangeInputYear}
                            picker="year"
                            placeholder={type.split("/")[1] === "update" ? inputProduct.vehicleYears : "Select year"}
                        />
                    </ConfigProvider>
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.vehicleYears && <InputErrorMessage message={"Year is required."} />}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.vehicleModel}
                        onChange={onChangeInput}
                        name={"vehicleModel"}
                        placeholder={"Model"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.vehicleModel && <InputErrorMessage message={"Model is required."} />}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.vehicleBrand}
                        onChange={onChangeInput}
                        name={"vehicleBrand"}
                        placeholder={"Brand"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.vehicleBrand && <InputErrorMessage message={"Brand is required."} />}
                {skeleton && !loading ? (
                    <Autocomplete placeholder={"Location"} />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.latitude && <InputErrorMessage message={"Location is required."} />}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.productPrice}
                        onChange={onChangeInput}
                        name={"productPrice"}
                        placeholder={"Price"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.productPrice && <InputErrorMessage message={"Price is required, should be a number."} />}
            </>
        );
    }

    if (type === "/create/rental" || type.includes("/update/rental")) {
        inputForm = (
            <>
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.productName}
                        onChange={onChangeInput}
                        name={"productName"}
                        placeholder={"Title"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.productName && <InputErrorMessage message={"Title is required"} />}
                {skeleton && !loading ? (
                    <InputDropdown
                        value={inputProduct.homeProperty}
                        data={newHomePropertyData}
                        onChange={onChangeInput}
                        name={"homeProperty"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.homeProperty && <InputErrorMessage message={"Home type is required"} />}
                {skeleton && !loading ? (
                    <InputDropdown
                        value={inputProduct.homeType}
                        data={newHomeTypeData}
                        onChange={onChangeInput}
                        name={"homeType"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.homeType && <InputErrorMessage message={"Property type is required"} />}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.bedroomQuantity}
                        onChange={onChangeInput}
                        name={"bedroomQuantity"}
                        placeholder={"Number of bedrooms"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.bedroomQuantity && (
                    <InputErrorMessage message={"Number of bedrooms are required, should be a number"} />
                )}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.bathroomQuantity}
                        onChange={onChangeInput}
                        name={"bathroomQuantity"}
                        placeholder={"Number of bathrooms"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.bathroomQuantity && (
                    <InputErrorMessage message={"Number of bathrooms are required, should be a number"} />
                )}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.productPrice}
                        onChange={onChangeInput}
                        name={"productPrice"}
                        placeholder={"Price"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.productPrice && <InputErrorMessage message={"Price is required, should be a number."} />}
                {skeleton && !loading ? (
                    <Autocomplete placeholder={"Location"} />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.latitude && <InputErrorMessage message={"Location is required"} />}
                {skeleton && !loading ? (
                    <InputForm
                        value={inputProduct.homeAddress}
                        onChange={onChangeInput}
                        name={"homeAddress"}
                        placeholder={"Property address"}
                    />
                ) : (
                    <Skeleton containerClassName="flex-1" height={50} />
                )}
                {error.homeAddress && <InputErrorMessage message={"Address is required"} />}
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="text-xl font-bold">
                    {type === "/create/vehicle" ? "About this vehicle" : "Required"}
                </div>
                <div className="max-w-[290px]">
                    {type === "/create/vehicle"
                        ? "Help buyers know more about the vehicle that you're listing"
                        : "Be as descriptive as possible"}
                </div>
                {inputForm}
            </div>
        </>
    );
}

export default RequiredContainer;
