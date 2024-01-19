import { HiOutlineEmojiSad } from "react-icons/hi";

function NotFoundProduct() {
    return (
        <>
            <div className="flex flex-col items-center mt-52">
                <div className="text-[6rem]">
                    <HiOutlineEmojiSad />
                </div>
                <div className="font-semibold text-4xl mt-2">Oops!</div>
                <div className="text-xl mt-2">
                    The product you are searching for could not be located in our current inventory.
                </div>
            </div>
        </>
    );
}

export default NotFoundProduct;
