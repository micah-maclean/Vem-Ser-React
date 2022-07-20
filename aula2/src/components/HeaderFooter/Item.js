import styles from "./Item.module.css";

const Item = ({url, text, children}) => {
    return (
        <li className={styles.item}>
            <a href={url}>{text}{children}</a>
        </li>
    )
}

export default Item;