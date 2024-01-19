import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import FormButton from "../../components/FormButton";

export default function PictureForm({ title, children, initialSrc, input, setInput, inputCoverImage }) {
    const inputEl = useRef(null);

    return (
        <div>
            <input
                type="file"
                className="hidden"
                ref={inputEl}
                onChange={(e) => {
                    if (e.target.files[0]) {
                        setInput(e.target.files[0]);
                    }
                }}
            />
            <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold">{title}</h5>
                <div>
                    <FormButton onClick={() => inputEl.current.click()}>
                        <FaEdit className="w-6 h-6 cursor-pointer hover:text-[#959595]" />
                    </FormButton>
                </div>
            </div>
            <div className="w-full">
                {children(input ? URL.createObjectURL(input, inputCoverImage) : initialSrc, () =>
                    inputEl.current.click(),
                )}
            </div>
        </div>
    );
}
