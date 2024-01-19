import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import { useState } from "react";
import { loginUser } from "../../stores/slices/authSlice";

function LoginForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        emailOrMobile: "",
        password: "",
    });

    const onChangeInput = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(loginUser(input));
    };

    return (
        <>
            <form onSubmit={handleSubmitForm} className="flex flex-col">
                <div className="block text-sm font-medium leading-6 text-gray-900">
                    <InputForm
                        name={"emailOrMobile"}
                        placeholder={"Email address or phone number"}
                        value={input.emailOrMobile}
                        onChange={onChangeInput}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <InputForm
                        name={"password"}
                        type="password"
                        placeholder={"Password"}
                        value={input.password}
                        onChange={onChangeInput}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="flex justify-center ">
                    <div className="flex rounded-md border-0 py-1.5 text-sm font-semibold leading-6 text-white w-48">
                        <Button type={"submit"} text={"Log in"} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default LoginForm;
