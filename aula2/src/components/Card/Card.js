import styles from './Card.module.css';

const Card = ({img, subtitle}) => {
    return(
        <li className={styles.card}>
            <img src={img}/>
            <small>{subtitle}</small>
        </li>
    );
}

export default Card;