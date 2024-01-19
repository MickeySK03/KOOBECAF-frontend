import { useState } from "react";
import { useDispatch } from "react-redux";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import InputErrorMessage from "./InputErrorMessage";
import { registerUser } from "../../stores/slices/authSlice";
import { registerSchema } from "../../utils/auth-validator";

const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });
    if (error) {
        const newError = {};
        error.details.map((x) => (newError[x.path[0]] = x.message));
        return newError;
    }
};

function RegisterForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        emailOrMobile: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({});

    const onChangeInput = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const validationError = validateRegister(input);
        if (validationError) return setError(validationError);
        setError({});
        dispatch(registerUser(input));
    };

    return (
        <>
            <form onSubmit={handleSubmitForm} className="flex flex-col">
                <div>
                    <InputForm
                        name={"firstName"}
                        placeholder={"First name"}
                        value={input.firstName}
                        onChange={onChangeInput}
                        isError={error.firstName}
                    />
                    {error.firstName && <InputErrorMessage message={"First Name is not allowed to be empty"} />}
                </div>
                <div>
                    <InputForm
                        name={"lastName"}
                        placeholder={"Last name"}
                        value={input.lastName}
                        onChange={onChangeInput}
                        isError={error.lastName}
                    />
                    {error.lastName && <InputErrorMessage message={"Last Name is not allowed to be empty"} />}
                </div>
                <div>
                    <InputForm
                        name={"emailOrMobile"}
                        placeholder={"Email adress or mobile number"}
                        value={input.emailOrMobile}
                        onChange={onChangeInput}
                        isError={error.emailOrMobile}
                    />
                    {error.emailOrMobile && (
                        <InputErrorMessage message={"Mobile is not allowed to be empty, should be a number"} />
                    )}
                </div>
                <div>
                    <InputForm
                        name={"password"}
                        type="password"
                        placeholder={"Password"}
                        value={input.password}
                        onChange={onChangeInput}
                        isError={error.password}
                    />
                    {error.password && <InputErrorMessage message={"Password is not allowed to be empty"} />}
                </div>
                <div>
                    <InputForm
                        name={"confirmPassword"}
                        type="password"
                        placeholder={"Confirm password"}
                        value={input.confirmPassword}
                        onChange={onChangeInput}
                        isError={error.confirmPassword}
                    />
                    {error.confirmPassword && (
                        <InputErrorMessage message={"Confirm Password is not match the original password"} />
                    )}
                </div>
                <div className="flex justify-end">
                    <div className="pt-4">
                        <Button type={"submit"} text={"Sign up"} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
