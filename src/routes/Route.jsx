import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RedirectIfAuthenticated from "../features/auth/RedirectIfAuthenticated";
import LoginPage from "../pages/LoginPage";
import Authenticated from "../features/auth/Authenticated";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import CreateProductPage from "../pages/CreateProductPage";
import CreateItemProductPage from "../pages/CreateItemProductPage";
import SellingPage from "../pages/SellingPage";
import CategoryPage from "../pages/CategoryPage";
import ProductItemPage from "../pages/ProductItemPage";
import WishlistPage from "../pages/WishlistPage";
import MessagerPage from "../pages/MessagerPage";
import InboxPage from "../pages/InboxPage";
// import ErrorPage from "../features/product/ErrorPage";
import SubscribePage from "../pages/SubscribePage";
import PaymentSuccessful from "../features/subscribe/PaymentSuccessful";
import PaymentFailed from "../features/subscribe/PaymentFailed";
import bgLogin from "../assets/Images/bgLogin.png";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Authenticated>
                <div className="h-full">
                    <Layout />
                </div>
            </Authenticated>
        ),
        children: [
            { path: "", element: <HomePage /> },
            { path: "/wishlist", element: <WishlistPage /> },
            { path: "/selling", element: <SellingPage /> },
            { path: "/category/:categoryId", element: <CategoryPage /> },
            { path: "/create", element: <CreateProductPage /> },
            { path: "/create/item", element: <CreateItemProductPage /> },
            { path: "/create/vehicle", element: <CreateItemProductPage /> },
            { path: "/create/rental", element: <CreateItemProductPage /> },
            { path: "/update/item/:productId", element: <CreateItemProductPage /> },
            { path: "/update/vehicle/:productId", element: <CreateItemProductPage /> },
            { path: "/update/rental/:productId", element: <CreateItemProductPage /> },
            { path: "/product/:productId", element: <ProductItemPage /> },
            { path: "/messager/:productId/:receiverId", element: <MessagerPage /> },
            { path: "/messager/seller/:productId/:receiverId", element: <MessagerPage /> },
            { path: "/inbox", element: <InboxPage /> },
            { path: "/subscribe", element: <SubscribePage /> },
            { path: "/paymentSuccessful", element: <PaymentSuccessful /> },
            { path: "/paymentFailed", element: <PaymentFailed /> },
        ],
        // errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: (
            <RedirectIfAuthenticated>
                <div className="h-screen bg-cover" style={{ backgroundImage: `url(${bgLogin})` }}>
                    <LoginPage />
                </div>
            </RedirectIfAuthenticated>
        ),
    },
]);

function Route() {
    return <RouterProvider router={router} />;
}

export default Route;
