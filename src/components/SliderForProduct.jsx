import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderForProduct({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        customPaging: function (i) {
            let binaryData = [];
            binaryData.push(inputProduct.productImage[i]);
            return (
                <div>
                    <img
                        className={`rounded-md ${i === index ? "border border-gray-100" : "opacity-50"}`}
                        id={i}
                        src={URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))}
                    />
                </div>
            );
        },
        beforeChange: function (c, n) {
            setIndex(n);
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="relative w-[400px] -z-20">
            <Slider {...settings}>
                {images.map((x, idx) => (
                    <div className="!flex justify-center bg-black/70" key={idx}>
                        <img
                            className="w-full aspect-square object-contain rounded-md"
                            src={URL.createObjectURL(images.productImage[idx])}
                        />
                    </div>
                ))}
            </Slider>
            <div className="absolute -top-1/4 -left-1/4 blur-md -z-10 w-[150%] aspect-square">
                <img
                    className="w-full aspect-square object-cover"
                    id={index}
                    src={URL.createObjectURL(
                        new Blob([images.productImage[index]], {
                            type: "application/zip",
                        }),
                    )}
                />
            </div>
        </div>
    );
}

export default SliderForProduct;
