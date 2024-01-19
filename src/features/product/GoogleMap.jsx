import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import { GOOGLE_MAPS_CONFIG } from "../../config/env";

const GoogleMapInput = ({ className, type }) => {
    const { inputProduct, productByProductId } = useSelector((state) => state.product);

    const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_CONFIG);

    const geometry = useMemo(() => {
        return {
            lat: inputProduct?.latitude,
            lng: inputProduct?.longitude,
        };
    }, [inputProduct.latitude, inputProduct.longitude]);

    const geometry2 = useMemo(() => {
        return {
            lat: productByProductId?.latitude,
            lng: productByProductId?.longitude,
        };
    }, [productByProductId]);

    if (!isLoaded) {
        return <div>Loading</div>;
    }

    return (
        <div className={className}>
            <GoogleMap
                zoom={16}
                center={type === "productPage" ? geometry2 : geometry}
                mapContainerStyle={{ width: "100%", height: 200 }}
            >
                <MarkerF position={type === "productPage" ? geometry2 : geometry} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapInput;
