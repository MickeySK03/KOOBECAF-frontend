import { useDispatch, useSelector } from "react-redux";
import { getInbox } from "../../stores/slices/chatSlice";
import { useEffect } from "react";
import ListChatCard from "./ListChatCard";

function ListChatContainer() {
    const dispatch = useDispatch();
    const { userInbox, loading } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(getInbox());
    }, []);

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    {userInbox && userInbox?.length > 0 ? (
                        userInbox.map((data, index) => (
                            <ListChatCard
                                key={index}
                                productName={data.product?.productName}
                                src={data.product.image[0].image}
                                productId={data.product.id}
                                productPrice={data.product.productPrice}
                                userId={data.buyer.id}
                                firstName={data.buyer.firstName}
                                lastName={data.buyer.lastName}
                                productDetail={data.product}
                            />
                        ))
                    ) : (
                        <div>Chat not Found</div>
                    )}
                </>
            )}
        </>
    );
}

export default ListChatContainer;
