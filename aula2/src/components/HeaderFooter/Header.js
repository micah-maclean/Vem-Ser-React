import Item from "./Item";
import Logo from "./Logo";
import styles from "./Header.module.css";
import logoImg from "../images/mushroom.png"

const Header = () => {
    return(
    <header className={styles.header}>
        <ul>
            <Item>
               <Logo image={logoImg} text='Melhores alunos do Vemser de todos os tempos'/> 
            </Item>
            <Item url='/home' text='Home'/>
            <Item url='/sobre' text='Sobre'/>
            <Item url='/contato' text='Contato'/>
        </ul>  
    </header>
    );
}

export default Header;