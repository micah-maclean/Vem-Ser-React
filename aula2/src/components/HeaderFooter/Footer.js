import Item from "./Item";
import styles from "./Footer.module.css"

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <ul>
                <Item url="/home" text="Home"/>
                <Item url="/about" text="About"/>
                <Item url="/contato" text="Contato"/>
            </ul>
            <address>Av. Andarai 532 - Porto Alegre</address>
        </footer>
    )
}

export default Footer;