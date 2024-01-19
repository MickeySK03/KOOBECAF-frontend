import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import Avatar from "../../components/Avatar";
import InputDropdown from "../../components/InputDropdown";
import CoverImage from "../../components/CoverImage";
import ProductCardUser from "../../features/profile/ProductCardUser";
import { addPath } from "../../utils/local-storage";
import Search from "../filter/Search";
import { resetSearchProductProfile } from "../../stores/slices/productSlice";
import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import NotFoundProduct from "../../components/NotFoundProduct";

export default function ProfileUser({ onClose, setEditUser }) {
    const [status, setStatus] = useState("ALL_PRODUCTS");
    const [sort, setSort] = useState("SORT_BY");
    const dispatch = useDispatch();
    const { authUserData } = useSelector((state) => state.auth);
    const { pathname } = useLocation();
    const { productByUserId, searchProductProfile } = useSelector((state) => state.product);
    const [skeleton, setSkeleton] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    const handleOnClick = () => {
        onClose();
        setEditUser(true);
        dispatch(resetSearchProductProfile());
    };

    const productStatus = [
        { id: 0, status: "ALL_PRODUCTS" },
        { id: 1, status: "AVAILABLE" },
        { id: 2, status: "SOLD" },
        { id: 3, status: "NOT_AVAILABLE" },
    ];

    const sortBy = [
        { id: 0, sort: "SORT_BY" },
        { id: 1, sort: "newest_first" },
        { id: 2, sort: "oldest_first" },
    ];

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const onChangeSort = (e) => {
        setSort(e.target.value);
    };

    let product = productByUserId;
    product = productByUserId?.filter((el) =>
        el.productName.toLowerCase().includes(searchProductProfile.toLowerCase().trim()) ? el : null,
    );

    if (status !== "ALL_PRODUCTS") {
        product = productByUserId?.filter((el) =>
            el.productName.toLowerCase().includes(searchProductProfile.toLowerCase().trim()) && el.status === status
                ? el
                : null,
        );
    }

    if (sort === "newest_first" || sort === "SORT_BY") {
        product?.sort((a, b) => b.id - a.id);
    }

    return (
        <>
            <div className="bg-white rounded-lg">
                <div className="relative">
                    {skeleton ? (
                        <CoverImage
                            className="rounded-t-lg bg-cover w-full h-[200px] "
                            src={authUserData?.coverImage}
                        />
                    ) : (
                        <Skeleton containerClassName="flex-1" height={200} />
                    )}

                    <div
                        className="absolute text-2xl top-[3px] left-[95%] hover:text-[#959595] text-white cursor-pointer"
                        onClick={() => {
                            onClose();
                            dispatch(resetSearchProductProfile());
                        }}
                    >
                        X
                    </div>
                    <div className="flex flex-col p-4">
                        <div className="flex justify-end">
                            <FaEdit className="w-6 h-6 cursor-pointer hover:text-[#959595]" onClick={handleOnClick} />
                        </div>
                        <div className="flex justify-center text-xl font-bold pt-10 border-b pb-3">
                            {authUserData?.firstName} {authUserData?.lastName}
                        </div>
                    </div>

                    <div className="absolute top-[37%] left-[39%]">
                        {skeleton ? (
                            <Avatar className="w-36" src={authUserData?.profileImage} />
                        ) : (
                            <Skeleton width={150} height={150} circle={true} />
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center px-4 pb-4 gap-4">
                        <Search className="" nameTagSearch="" div="px-0" placeholder="Search" type={"profile"} />
                        <InputDropdown
                            name={"status"}
                            data={productStatus}
                            className={"bg-second hover:bg-second-dark"}
                            value={status}
                            onChange={onChangeStatus}
                        />
                        <InputDropdown
                            name={"sort"}
                            data={sortBy}
                            className={
                                " bg-second hover:bg-second-dark focus:border-1 border-second focus:ring-2 focus:ring-second-dark"
                            }
                            value={sort}
                            onChange={onChangeSort}
                        />
                    </div>
                    <div className="grid grid-cols-3 justify-between px-4 pb-4 gap-2 overflow-y-auto h-[264px]">
                        {productByUserId && productByUserId.length > 0 ? (
                            product?.map((data) => (
                                <Link
                                    key={data.id}
                                    onClick={() => {
                                        addPath(pathname);
                                        onClose();
                                        dispatch(resetSearchProductProfile());
                                    }}
                                    to={`/product/${data.id}`}
                                    state={{ productDetail: data }}
                                >
                                    <ProductCardUser
                                        src={data.image[0]?.image}
                                        productPrice={data.productPrice}
                                        productName={data.productName}
                                    />
                                </Link>
                            ))
                        ) : (
                            <NotFoundProduct />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
