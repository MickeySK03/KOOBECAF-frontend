import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import RegisterForm from "./RegisterForm";

function RegisterContainer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex w-full justify-center rounded-md border-0 py-1.5 text-sm font-semibold leading-6 text-white">
                <Button onClick={() => setIsOpen(true)} text={"Create new account"} />
            </div>
            <Modal title={"Sign up"} open={isOpen} onClose={() => setIsOpen(false)}>
                <RegisterForm />
            </Modal>
        </>
    );
}

export default RegisterContainer;
