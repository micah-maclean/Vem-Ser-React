import styles from "./ReposCard.module.css"

const ReposCard = ({name, description, language, live, url}) => {
    console.log(live)
    return(
        <div className={styles.reposCard}>
            
            <h3><i className="fa-brands fa-github-square"></i>{name}<span>{language}</span></h3>
            <p>{description ? description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus voluptate voluptatem magnam odit provident soluta, aut maxime, deleniti non reprehenderit inventore explicabo numquam qui corporis temporibus quos tempora, autem molestiae? Voluptate perspiciatis quas illo eum exercitationem laboriosam repudiandae corporis provident maxime dolorem dolorum tempora quam, id rem excepturi totam atque?"}</p>
            <a href={live}>{live}</a>
            
            <a href={url}>Learn more</a>
        </div>
    )
}

export default ReposCard;