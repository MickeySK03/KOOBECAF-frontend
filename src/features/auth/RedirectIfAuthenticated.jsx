import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RedirectIfAuthenticated({ children }) {
    const authUser = useSelector((state) => state.auth.authUserData);

    if (authUser) {
        return <Navigate to="/" />;
    }
    return children;
}

export default RedirectIfAuthenticated;
