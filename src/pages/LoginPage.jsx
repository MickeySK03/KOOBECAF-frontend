import LoginContent from "../features/auth/LoginContent";
import LoginForm from "../features/auth/LoginForm";
import RegisterContainer from "../features/auth/RegisterContainer";

function LoginPage() {
    return (
        <>
            <div className="flex justify-start items-center h-full ml-60">
                <div className="flex flex-col items-center ">
                    <div className="text-center">
                        <div className="text-6xl font-fontHeader pb-8 mx-auto h-10 ">KOOBECAF</div>
                        <div className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
                            LOG IN TO KOOBECAF
                        </div>
                        <LoginForm />
                    </div>
                    <div className="border-b mt-3 my-3 border-dashed w-72 border-main-dark" />
                    <div>
                        <RegisterContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
