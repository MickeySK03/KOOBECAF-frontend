import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utils/local-storage";
import { useSelector } from "react-redux";

function Authenticated({ children }) {
    const authUser = getAccessToken();
    const user = useSelector((state) => state.auth.authUserData);

    if (!authUser && !user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default Authenticated;
