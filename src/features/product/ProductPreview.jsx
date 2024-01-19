import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { setInputProductCategory } from "../../stores/slices/productSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { fetchProductByProductId } from "../../stores/slices/productSlice";
import { GOOGLE_MAPS_API_KEY } from "../../config/env";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import GoogleMapInput from "../../features/product/GoogleMap";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import googleAxios from "../../config/googleAxios";

function ProductPreview() {
    const dispatch = useDispatch();

    const [location, setLocation] = useState("");

    const [currentSlide, setCurrentSlide] = useState(0);
    const [skeleton, setSkeleton] = useState(false);
    const { productId } = useParams();
    const { authUserData } = useSelector((state) => state.auth);
    const { inputProduct, inputLocation, loading } = useSelector((state) => state.product);
    const { pathname } = useLocation();

    useEffect(() => {
        if (productId) {
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
        }
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            setSkeleton(true);
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (pathname === "/create/rental" || pathname.includes("/update/rental")) {
            const id = 2;
            const fieldValue = "PROPERTY_FOR_RENT";
            dispatch(setInputProductCategory({ id, fieldValue }));
        }
        if (pathname === "/create/vehicle" || pathname.includes("/update/vehicle")) {
            const id = 1;
            const fieldValue = "VEHICLES";
            dispatch(setInputProductCategory({ id, fieldValue }));
        }
    }, [authUserData]);

    let newFile = [];

    if (inputProduct.productImage) {
        newFile = [...newFile, ...Array.from(inputProduct.productImage)];
    }
    if (inputProduct.image) {
        newFile = [...newFile, ...inputProduct.image];
    }

    function NextArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div
                    onClick={onClick}
                    className="hover:bg-white/20 transition duration-150 text-white absolute flex p-4 h-full items-center top-1/2 transform -translate-y-1/2 right-0 text-3xl"
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
                className="hover:bg-white/20 transition duration-150  text-white absolute flex p-4 h-full items-center top-1/2 transform -translate-y-1/2 left-0 text-3xl z-10"
            >
                <FaArrowLeft />
            </div>
        );
    }

    const settings = {
        customPaging: function (i) {
            let binaryData = [];
            binaryData.push(inputProduct.productImage[i]);
            return (
                <div>
                    <img
                        className={`rounded-md ${i === currentSlide ? "border border-gray-100" : "opacity-50"}`}
                        id={i}
                        src={
                            newFile[i]?.image || URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
                        }
                    />
                </div>
            );
        },
        beforeChange: function (current, next) {
            setCurrentSlide(next);
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <>
            <div className="flex w-full justify-center mr-6 ml-[375px] bg-main-light">
                <div className="flex flex-col p-4 w-full mx-4 place-self-center bg-white shadow-lg rounded-lg">
                    <div className="flex-1 ">
                        <div className="flex pb-3 text-xl font-bold">Preview</div>
                    </div>
                    <div className="grid grid-cols-2 border rounded-lg ">
                        <div className="flex items-center justify-center w-full overflow-clip drop-shadow-md bg-cover rounded-lg">
                            {newFile.length !== 0 ? (
                                <>
                                    {skeleton && !loading ? (
                                        <div className="relative w-full -z-20">
                                            <Slider {...settings}>
                                                {newFile.map((file, idx) => (
                                                    <div key={idx} className="!flex justify-center bg-black/80">
                                                        <img
                                                            className="w-[400px] aspect-square object-contain rounded-md"
                                                            src={file?.image || URL.createObjectURL(file)}
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                            <div className="absolute -top-1/2 -left-1/4 blur-md -z-10 w-[150%] aspect-square">
                                                <img
                                                    className="w-full aspect-square object-cover"
                                                    id={currentSlide}
                                                    src={
                                                        newFile[currentSlide]?.image ||
                                                        URL.createObjectURL(
                                                            new Blob([inputProduct.productImage[currentSlide]], {
                                                                type: "application/zip",
                                                            }),
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <Skeleton containerClassName="flex-1" height={500} />
                                    )}
                                </>
                            ) : (
                                <div className="bg-empty h-full w-full">
                                    {skeleton && !loading ? (
                                        <div className="flex h-full flex-col justify-center items-center">
                                            <div className="text-2xl font-semibold">Your Listing Preview</div>
                                            <div>As you create your listing, your can preview</div>
                                            <div>how it will appear to others on Marketplace.</div>
                                        </div>
                                    ) : (
                                        <Skeleton containerClassName="flex-1" height={500} />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col gap-y-2 w-full p-3 ">
                            <div>
                                <p className="truncate text-lg mb-2">
                                    {skeleton && !loading ? (
                                        <>{inputProduct.productName ? inputProduct.productName : "Title"}</>
                                    ) : (
                                        <Skeleton containerClassName="flex-1" height={40} />
                                    )}
                                </p>
                                <p className="font-thin">
                                    {skeleton && !loading ? (
                                        <>฿ {inputProduct.productPrice ? inputProduct.productPrice : "0"}</>
                                    ) : (
                                        <Skeleton containerClassName="flex-1" height={40} />
                                    )}
                                </p>
                            </div>

                            <div className="border-b pb-2">
                                <p className="text-lg mb-2">Description</p>
                                {skeleton && !loading ? (
                                    <p className="break-all font-thin">
                                        {inputProduct.description
                                            ? inputProduct.description
                                            : "Description will appear here."}
                                    </p>
                                ) : (
                                    <Skeleton containerClassName="flex-1" height={40} />
                                )}
                                {skeleton && !loading ? (
                                    <>
                                        <GoogleMapInput className="py-2" />
                                        <p className="truncate font-thin">
                                            {inputLocation.length !== 0 ? inputLocation : location}
                                        </p>
                                    </>
                                ) : (
                                    <Skeleton containerClassName="flex-1" height={120} />
                                )}
                            </div>

                            <div>
                                <p className="text-lg mb-2">Seller Information</p>
                                {skeleton && !loading ? (
                                    <div className="flex gap-x-2 items-center">
                                        <Avatar src={authUserData?.profileImage} />
                                        <p>
                                            {authUserData?.firstName} {authUserData?.lastName}
                                        </p>
                                    </div>
                                ) : (
                                    <Skeleton containerClassName="flex-1" height={40} />
                                )}
                            </div>
                            <div className="flex px-8">
                                <Button type={"submit"} text={"Message"} className="my-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPreview;
