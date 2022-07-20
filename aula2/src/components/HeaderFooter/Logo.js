import styles from "./Logo.module.css";

const Logo = ({image, text}) => {
    return (
        <div className={styles.logo}>
            <img src={image} alt=""  height={60}/>
            <small>{text}</small>
        </div>
    )
}

export default Logo;