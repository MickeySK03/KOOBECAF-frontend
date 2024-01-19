import ProductPreview from "../features/product/ProductPreview";
import defaultProduct from "../assets/Images/hero-img_copy.jpg";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "../config/env";

function CreateItemProductPage() {
    return (
        <>
            <div className="flex bg-main-light h-screen">
                <ProductPreview src={defaultProduct} productDetail="Description" />
            </div>
        </>
    );
}

export default CreateItemProductPage;
