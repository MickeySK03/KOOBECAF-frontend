import profileDefault from "../assets/Images/profile-default.png";

export default function Avatar({ className = "h-10", src }) {
    const defaultclass = "rounded-full aspect-square ";
    const classes = defaultclass + " " + className;
    return (
        <img src={src ? (src !== "null" ? src : profileDefault) : profileDefault} alt="user" className={classes}></img>
    );
}
