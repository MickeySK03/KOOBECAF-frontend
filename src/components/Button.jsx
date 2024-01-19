function Button({ name, type, text, onClick, className = "bg-second hover:bg-second-dark " }) {
    return (
        <button
            type={type}
            onClick={onClick}
            name={name}
            className={`flex-1 text-lg rounded-full border-2 px-6 py-2 ${className}`}
        >
            {text}
        </button>
    );
}

export default Button;
