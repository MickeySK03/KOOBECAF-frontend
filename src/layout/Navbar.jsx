import { useDispatch, useSelector } from "react-redux";
import { MdLibraryAddCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import { removePath } from "../utils/local-storage";
import { resetInputProduct, resetLocation } from "../stores/slices/productSlice";
import DropdownUser from "../components/DropdownUser";

export default function Navbar() {
    const dispatch = useDispatch();
    const { authUserData } = useSelector((state) => state.auth);

    return (
        <div className="flex justify-between items-center h-full px-6 text-white">
            <Link
                onClick={() => {
                    removePath();
                    dispatch(resetInputProduct());
                    dispatch(resetLocation());
                }}
                to="/"
            >
                <div className="text-4xl font-fontHeader text-white">KOOBECAF</div>
            </Link>
            <div className="flex fixed gap-6 text-lg right-6 items-center ">
                {!authUserData?.isSubscribe ? (
                    <Link to="/subscribe">
                        <div className="flex justify-center items-center bg-error-light/90 px-2 py-1 rounded-md hover:bg-error-light/70 gap-2">
                            <div>Subscribe</div>
                            <div>
                                <MdLibraryAddCheck />
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="flex justify-center items-center bg-second px-2 py-1 rounded-md gap-2 ">
                        <div>Premium</div>
                        <div>
                            <MdLibraryAddCheck />
                        </div>
                    </div>
                )}
                <DropdownUser />
            </div>
        </div>
    );
}
