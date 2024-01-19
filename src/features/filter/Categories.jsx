import { FaCarRear, FaBuilding, FaMusic, FaPaw } from "react-icons/fa6";
import { GiPriceTag, GiClothes, GiSmartphone, GiGardeningShears } from "react-icons/gi";
import { MdOutlineFamilyRestroom, MdOutlineSmartToy, MdSportsMartialArts } from "react-icons/md";
import { PiShirtFoldedFill } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuToyBrick } from "react-icons/lu";
import CategorieItem from "./CategorieItem";

function Categories() {
    const { pathname } = useLocation();
    const { categoryData, loading } = useSelector((state) => state.category);

    const list = [
        { icons: <FaCarRear />, title: "Vehicle" },
        { icons: <FaBuilding />, title: "Property for rent" },
        { icons: <GiClothes />, title: "Apparel" },
        { icons: <GiPriceTag />, title: "Classified" },
        { icons: <PiShirtFoldedFill />, title: "Clothing" },
        { icons: <GiSmartphone />, title: "Electronics" },
        { icons: <BiCameraMovie />, title: "Entertainment" },
        { icons: <MdOutlineFamilyRestroom />, title: "Family" },
        { icons: <GiGardeningShears />, title: "Garden and outdoors" },
        { icons: <MdOutlineSmartToy />, title: "Hobbies" },
        { icons: <FaHome />, title: "Home goods" },
        { icons: <FaMusic />, title: " Musical instrument" },
        { icons: <HiOutlineBuildingOffice2 />, title: "Office supplies" },
        { icons: <FaPaw />, title: "Pet supplies" },
        { icons: <MdSportsMartialArts />, title: "Sporting goods" },
        { icons: <LuToyBrick />, title: "Toy & games" },
    ];

    const updatedList = list?.map((item, index) => {
        const categoryMatch = categoryData?.find((category) => category.id === index + 1);

        if (categoryMatch) {
            return {
                ...item,
                category: categoryMatch,
            };
        } else {
            return item;
        }
    });

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <div className="flex flex-col pb-60">
                    <div className="text-lg font-semibold pt-2">Categories</div>
                    {updatedList?.map((item) => (
                        <CategorieItem
                            key={`${item.category?.id}-${item.title}`}
                            {...item}
                            to={`/category/${item.category?.typeOfCategory}`}
                            isActive={pathname === `/category/${item.category?.typeOfCategory}`}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Categories;
