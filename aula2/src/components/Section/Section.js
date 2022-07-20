import styles from "./Section.module.css";
const Section = ({title, children, backgroundColor, color}) => {
    return(
        <section className={styles.section} style={{backgroundColor:backgroundColor, color: color}}>
            <div className={styles.container}>
                {title ? <h2>{title}</h2>  : <></>}
                {children}  
            </div>
        </section>
    )
}

export default Section;