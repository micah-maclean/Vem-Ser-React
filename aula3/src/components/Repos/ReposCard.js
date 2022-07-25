import styles from "./ReposCard.module.css";
import moment from "moment";

const ReposCard = ({name, lastUpdated, description, language, live, url}) => {
    return(
        <div className={styles.reposCard}>
            <a href={url} target="_blank">
                <div>
                    <h2><i className="fa-brands fa-github-square"></i>{name}<span>{language}</span></h2>
                    <span>{moment(lastUpdated).format("MMMM YYYY")}</span>
                </div>
                
                <div>
                    <p>{description ? description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus voluptate voluptatem magnam odit provident soluta, aut maxime, deleniti non reprehenderit inventore explicabo numquam qui corporis temporibus quos tempora, autem molestiae?"}</p>
                    {live && 
                        <a href={live} target="_blank">
                            <i className="fa-solid fa-link"></i>
                            {live}
                        </a>}
                </div>
            </a>
        </div>
    )
}

export default ReposCard;