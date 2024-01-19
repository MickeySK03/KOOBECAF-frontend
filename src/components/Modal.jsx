function Modal({ title, children, maxWidth = 27, open, onClose, className }) {
    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 backdrop-blur-sm z-20"></div>
                    <div className="fixed inset-0 z-30">
                        <div className="flex justify-center items-center min-h-full p-4">
                            <div
                                className="rounded-lg w-full bg-second-light shadow-2xl border"
                                style={{ maxWidth: `${maxWidth}rem` }}
                            >
                                <div className="flex justify-between p-4 text-xl border-b">
                                    <div className="invisible">X</div>
                                    <div className={`text-3xl ${className}`}>{title}</div>
                                    <div className="text-gray-500 cursor-pointer" onClick={onClose}>
                                        X
                                    </div>
                                </div>
                                <div className="p-4">{children}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Modal;
