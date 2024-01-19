import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, CircleF } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { GOOGLE_MAPS_CONFIG } from "../../config/env";

const SubscribeGoogleMap = ({ className }) => {
    const { inputProduct, loading, productData } = useSelector((state) => state.product);
    const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_CONFIG);

    const geometry = useMemo(() => {
        return {
            lat: inputProduct.latitude,
            lng: inputProduct.longitude,
        };
    }, [inputProduct.latitude, inputProduct.longitude]);

    if (!isLoaded) {
        return <div>Loading</div>;
    }

    return (
        <div className={className}>
            <GoogleMap zoom={13} center={geometry} mapContainerStyle={{ width: "100%", height: 300 }}>
                <MarkerF position={geometry} />
                <CircleF
                    radius={2500}
                    center={geometry}
                    options={{
                        strokeColor: "#ff0000",
                        fillColor: "#ff0000",
                        fillOpacity: 0.3,
                        strokeWeight: "2",
                        clickable: false,
                        editable: true,
                        zIndex: 1,
                    }}
                />
            </GoogleMap>
        </div>
    );
};

export default SubscribeGoogleMap;
