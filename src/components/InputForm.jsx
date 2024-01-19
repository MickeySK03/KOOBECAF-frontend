export default function InputForm({
    type = "text",
    placeholder,
    onChange,
    value,
    styles,
    isError,
    name,
    className = "pt-4",
}) {
    return (
        <div className={`w-full text-lg font-light ${className} `}>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={` ${styles} ${
                    isError
                        ? "w-full rounded-full outline-none border-2 px-4 py-2  focus:border-1 border-error-light-soft focus:ring-2 focus:ring-error-light  "
                        : "w-full rounded-full outline-none border-2 px-4 py-2  focus:border-1 border-main focus:ring-2 focus:ring-main-dark"
                }`}
            ></input>
        </div>
    );
}
