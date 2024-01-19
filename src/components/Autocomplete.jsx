import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { setInputProduct, setInputLocation } from "../stores/slices/productSlice";
import { useDispatch } from "react-redux";

export default function Autocomplete({ placeholder, className }) {
    const dispatch = useDispatch();

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({ debounce: 600 });

    const handleSelectLocation = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });

        const { lat, lng } = getLatLng(results[0]);

        let fieldName = "latitude";
        let fieldValue = lat;
        let fieldLocation = results[0].formatted_address;

        dispatch(setInputProduct({ fieldName, fieldValue }));

        fieldName = "longitude";
        fieldValue = lng;
        dispatch(setInputProduct({ fieldName, fieldValue }));

        dispatch(setInputLocation({ fieldLocation }));
    };

    return (
        <div className="pt-4">
            <input
                className={`z-10 w-full px-4 py-2 bg-white rounded-full shadow-md border-2 focus:border-1 border-main focus:ring-2 focus:ring-main-dark ${className}`}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                placeholder={placeholder}
            />
            <div className="bg-white">
                {status === "OK" &&
                    data.map(({ place_id, description }) => {
                        return (
                            <div key={place_id} className="item" onClick={() => handleSelectLocation(description)}>
                                {description}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
