import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import SideNavCreate from "./SideNavCreate";
import SideNavItemCreate from "./SideNavItemCreate";
import SideNavSelling from "./SideNavSelling";
import SideNavCategory from "./SideNavCategory";
import SideNavWishlist from "./SideNavWishlist";
import MessageInbox from "./MessageInbox";

function Layout() {
    const { pathname } = useLocation();
    const params = useParams();

    let sideNav = (
        <div className="flex flex-col h-full w-full">
            <div className="fixed w-full top-0 bg-dark-night h-16 z-20">
                <Header />
            </div>
            <div className="flex w-full">
                <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                    <SideNav />
                </div>

                <div className="w-full">
                    <div className="h-16"></div>
                    <Outlet />
                </div>
                <div className="fixed right-4 bottom-4 z-10">
                    <MessageInbox />
                </div>
            </div>
        </div>
    );

    if (pathname === "/create") {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-[360px] top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavCreate />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === "/create/item" || pathname.includes("/update/item")) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-[360px] top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavItemCreate header={"Item for sale"} type={pathname} />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === "/create/vehicle" || pathname.includes("/update/vehicle")) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-[360px] top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavItemCreate header={"Vehicle type"} type={pathname} />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === "/create/rental" || pathname.includes("/update/rental")) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-[360px] top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavItemCreate header={"New Home Listing"} type={pathname} />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname.startsWith("/category/")) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavCategory />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                    <div className="fixed right-4 bottom-4 z-10">
                        <MessageInbox />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === "/selling") {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavSelling />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === `/product/${params.productId}`) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="h-16"></div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === "/wishlist") {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-20">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px] z-10">
                        <SideNavWishlist />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                    <div className="fixed right-4 bottom-4 z-10">
                        <MessageInbox />
                    </div>
                </div>
            </div>
        );
    }
    if (pathname === "/inbox") {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-10">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px]">
                        <SideNav />
                    </div>
                    <div className="w-full">
                        <div className="h-16"></div>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === `/messager/seller/${params.productId}/${params.receiverId}`) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-10">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px]">
                        <SideNav />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (pathname === `/messager/${params.productId}/${params.receiverId}`) {
        sideNav = (
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full top-0 bg-dark-night h-16 z-10">
                    <Header />
                </div>
                <div className="flex w-full">
                    <div className="fixed top-0 pt-12 bg-second-light min-w-[360px]">
                        <SideNav />
                    </div>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    if (
        pathname.includes("/subscribe") ||
        pathname.includes("/paymentSuccessful") ||
        pathname.includes("/paymentFailed")
    ) {
        sideNav = (
            <div className="fixed w-full top-0 bg-dark-night h-16 z-10">
                <Header />
                <div className="w-full bg-main-light h-screen">
                    <Outlet />
                </div>
            </div>
        );
    }

    return <>{sideNav}</>;
}

export default Layout;
