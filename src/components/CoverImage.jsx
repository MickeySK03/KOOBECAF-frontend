import coverDefault from "../assets/Images/cover-default.png";

export default function CoverImage({ className, src }) {
    const defaultclass = "bg-cover w-full h-[200px]";
    const classes = defaultclass + " " + className;

    return (
        <img
            src={src ? (src !== "null" ? src : coverDefault) : coverDefault}
            alt="coverImage"
            className={classes}
        ></img>
    );
}
