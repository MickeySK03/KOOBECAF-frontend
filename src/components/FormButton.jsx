export default function FormButton({ children, onClick }) {
    return (
        <button className="px-3 py-1.5 hover:gray-100 rounded-md" onClick={onClick}>
            {children}
        </button>
    );
}
