import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductByUserId, updateProductStatus } from "../stores/slices/productSlice";
import Modal from "./Modal";
import Button from "./Button";

function InputAvailable({ name, data, productId, status }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    let context = null;

    const dataMap = (type) => {
        context = data.map((x) => (
            <option value={x[type]} key={x.id} className="bg-white text-black">
                {x[type].replace(/_/g, " ")}
            </option>
        ));
    };

    dataMap(name);

    const onChangeInput = (e) => {
        const fieldValue = e.target.value;
        if (fieldValue === "SOLD") {
            return setIsOpen(true);
        }
        dispatch(updateProductStatus({ fieldValue, productId }))
            .unwrap()
            .then((res) => {
                dispatch(fetchProductByUserId(res.userId));
            });
    };

    const updateStatus = () => {
        const fieldValue = "SOLD";
        dispatch(updateProductStatus({ fieldValue, productId }))
            .unwrap()
            .then((res) => {
                dispatch(fetchProductByUserId(res.userId));
            });
    };

    return (
        <>
            {status === "SOLD" ? (
                <div className="text-white w-72 text-xl rounded-md py-2 px-3 bg-error-light">SOLD</div>
            ) : (
                <select
                    className={`border-none rounded-md ${
                        status === "AVAILABLE" ? "bg-available" : "bg-second"
                    }  text-white w-72 text-xl`}
                    name={name}
                    value={status}
                    onChange={onChangeInput}
                >
                    {context}
                </select>
            )}
            <Modal
                className={"text-center"}
                title={"Are you sure to change status?"}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className="text-center text-xl">"If you select status sold you can't change any status"</div>
                <div className="flex mt-8">
                    <Button
                        onClick={updateStatus}
                        className="!bg-error-light text-white !hover:bg-error-light/80"
                        text="SOLD"
                    />
                    <Button onClick={() => setIsOpen(false)} className="!bg-empty hover:!bg-main" text="NO" />
                </div>
            </Modal>
        </>
    );
}

export default InputAvailable;
