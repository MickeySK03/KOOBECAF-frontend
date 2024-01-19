import React from "react";

function InputDropdown({ name, value, data, onChange, className = "mt-4" }) {
    let context = null;

    const dataMap = (type) => {
        context = data.map((x) => (
            <option value={x[type]} key={x.id} className="bg-white text-black">
                {x[type].replace(/_/g, " ")}
            </option>
        ));
    };

    dataMap(name);

    return (
        <>
            <select
                className={`w-full appearance-none rounded-full outline-none border-2 px-4 py-2 focus:border-1 border-main focus:ring-2 focus:ring-main-dark ${className}`}
                name={name}
                value={value}
                onChange={onChange}
            >
                {context}
            </select>
        </>
    );
}

export default InputDropdown;
