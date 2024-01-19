import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { BsFillChatDotsFill, BsFillBookmarkFill } from "react-icons/bs";
import {
    fetchAllProduct,
    fetchProductByProductId,
    setInputSubLocation,
    wishListProduct,
} from "../stores/slices/productSlice";
import { FaArrowLeft, FaArrowRight, FaClock, FaHouse, FaWarehouse, FaX } from "react-icons/fa6";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GOOGLE_MAPS_API_KEY } from "../config/env";
import { getPath, removeLastPath, removePath } from "../utils/local-storage";

import Slider from "react-slick";
import formatTimeAgo from "../utils/time-ago";
import GoogleMap from "../features/product/GoogleMap";
import Avatar from "../components/Avatar";
import googleAxios from "../config/googleAxios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductItemPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { productId } = useParams();
    const { isWishList, productData } = useSelector((state) => state.product);
    const { authUserData } = useSelector((state) => state?.auth);
    const { state } = useLocation();

    const [location, setLocation] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const category = state.productDetail.categoryId;
    const seller = state.productDetail.userId;
    const client = authUserData?.id;

    let prevProduct = null;

    if (getPath().length === 1 && getPath()[0].includes("/messager")) {
        prevProduct = productData?.find((x) => x.id === +getPath()[getPath().length - 1].split("/")[4]);
    } else {
        prevProduct = productData?.find((x) => x.id === +getPath()[getPath().length - 1].split("/")[2]);
    }

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, []);

    useEffect(() => {
        dispatch(fetchProductByProductId(productId))
            .unwrap()
            .then((res) => {
                googleAxios
                    .get(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${res.product.latitude},${res.product.longitude}&key=${GOOGLE_MAPS_API_KEY}`,
                    )
                    .then((res) => {
                        setLocation(res.data.results[0].formatted_address);
                    });
            });
    }, [productId]);

    useEffect(() => {
        setIsActive(isWishList);
    }, [isWishList]);

    useEffect(() => {
        dispatch(fetchProductByProductId(state.productDetail.id));
    }, []);

    useEffect(() => {
        const imgs = state.productDetail.image.map((el) => el.image);
        setImages(imgs);
    }, [state.productDetail]);

    const handleClick = () => {
        dispatch(wishListProduct(state.productDetail.id));
        setIsActive(!isActive);
    };

    function NextArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div
                    onClick={onClick}
                    className="hover:bg-white/20 transition duration-150 text-white absolute flex p-6 h-full items-center top-1/2 transform -translate-y-1/2 right-0 text-3xl"
                >
                    <FaArrowRight />
                </div>
            </>
        );
    }

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="hover:bg-white/20 transition duration-150 text-white absolute flex p-6 h-full items-center top-1/2 transform -translate-y-1/2 left-0 text-3xl z-10"
            >
                <FaArrowLeft />
            </div>
        );
    }

    const settings = {
        customPaging: function (i) {
            return (
                <img
                    src={images[i]}
                    alt={`Image ${i}`}
                    className={`rounded-md ${i === currentSlide ? "border border-gray-100" : "opacity-50"}`}
                />
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const closePage = () => {
        if (getPath().length - 1 === 0) {
            navigate(getPath()[getPath().length - 1] || "/");
            removePath();
            dispatch(setInputSubLocation(""));
        } else {
            navigate(getPath()[getPath().length - 1] || "/");
            removeLastPath();
            dispatch(setInputSubLocation(""));
        }
    };

    return (
        <>
            <div className="flex w-full h-screen overflow-clip pt-16">
                <div className="relative flex items-center w-2/3">
                    <div className="w-full">
                        <Slider {...settings}>
                            {images.map((image, index) => (
                                <div key={index} className="!flex justify-center bg-black/80">
                                    <img
                                        src={image}
                                        alt={`Image ${index}`}
                                        className="w-[450px] aspect-square object-contain"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="absolute blur-md -z-10 w-[100%] aspect-square">
                        <img
                            className="w-full aspect-square object-cover"
                            id={currentSlide}
                            src={images[currentSlide]}
                        />
                    </div>
                </div>
                <div className="flex flex-col p-4 w-1/3 bg-second-light overflow-auto">
                    {category == 1 ? (
                        <div className="flex justify-between font-bold text-2xl">
                            <div>
                                {state.productDetail?.vehicleYears} {state.productDetail?.vehicleBrand}
                                {state.productDetail?.vehicleModel}
                            </div>
                            <Link
                                onClick={closePage}
                                className="flex justify-center mr-2 items-center bg-black/50 min-w-[40px] max-h-[40px] aspect-square rounded-full text-white text-lg cursor-pointer"
                                state={{ productDetail: prevProduct }}
                            >
                                <FaX />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <div className="font-bold text-2xl">{state.productDetail?.productName}</div>
                            <Link
                                onClick={closePage}
                                className="flex justify-center mr-2 items-center bg-black/50 min-w-[40px] max-h-[40px] aspect-square rounded-full text-white text-lg cursor-pointer"
                                state={{ productDetail: prevProduct }}
                            >
                                <FaX />
                            </Link>
                        </div>
                    )}
                    <div className="text-lg">&#3647; {state.productDetail?.productPrice}</div>
                    {category == 2 ? (
                        <div className="text-sm text-slate-500">Property For {state.productDetail?.homeProperty}</div>
                    ) : (
                        <div className="hidden"></div>
                    )}
                    <div className="flex gap-2 items-center text-slate-500 py-2">
                        <FaClock />
                        Listed {formatTimeAgo(state.productDetail?.createdAt)}
                    </div>
                    {client === seller ? (
                        <div className="hidden"></div>
                    ) : (
                        <div className="inline-flex gap-4 py-2" role="group">
                            <Link
                                to={`/messager/${state.productDetail.id}/${state.productDetail.userId}`}
                                state={state}
                            >
                                <button className="text-lg rounded-2xl border-2 py-2 px-8 bg-second hover:bg-second-dark">
                                    <div className=" flex flex-row justify-center items-center">
                                        <div>
                                            <BsFillChatDotsFill />
                                        </div>
                                        <div className="px-1">Message</div>
                                    </div>
                                </button>
                            </Link>
                            <button
                                className={`text-lg rounded-xl border-2 py-2 px-3 ${
                                    isActive ? "bg-sky-400 hover:bg-sky-700" : "bg-white"
                                } `}
                                onClick={handleClick}
                            >
                                <div className="flex justify-center">
                                    <BsFillBookmarkFill />
                                </div>
                            </button>
                        </div>
                    )}
                    {category == 2 ? (
                        <div>
                            <div className="font-semibold text-lg">Property details</div>
                            <div className="text-slate-500 flex gap-2 items-center">
                                {state.productDetail?.homeType === "HOUSE" && <FaHouse />}
                                {state.productDetail?.homeType === "FLAT" && <HiMiniBuildingOffice2 />}
                                {state.productDetail?.homeType === "TOWNHOME" && <BiSolidBuildingHouse />}
                                <div className="pt-1">{state.productDetail?.homeType}</div>
                            </div>
                            <div className="text-slate-500 flex gap-2">
                                <div className="pt-[2px]">
                                    <FaWarehouse />
                                </div>
                                <div className="flex gap-2 items-center">
                                    {state.productDetail?.bedroomQuantity} beds {state.productDetail?.bathroomQuantity}{" "}
                                    baths
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden"></div>
                    )}
                    <div className="my-4 pt-4 border-t">
                        <div className="font-bold text-xl">Description</div>
                        <div className="w-full">{state.productDetail.description}</div>
                    </div>
                    <GoogleMap type={"productPage"} />
                    <p className="truncate font-thin">{location}</p>

                    <div className="flex flex-col py-4 gap-3 border-t mt-4">
                        <div className="font-bold text-xl">Seller information</div>
                        <div className="flex gap-3 items-center ">
                            <Avatar src={state.productDetail.usersId?.profileImage} />
                            <div>
                                {state.productDetail.usersId?.firstName} {state.productDetail.usersId?.lastName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItemPage;
