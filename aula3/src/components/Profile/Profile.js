import moment from "moment";
import styles from "./Profile.module.css"
import Section from "../Section/Section";

const Profile = ({photo, name, user, bio, company, location, blog, followers, following, createdAt}) => {
    return(
        <Section>
            <div className={styles.profile}>
                <img src={photo} alt={`${name} `} />


                <h2>{name}<span>{user}</span></h2>
                <p>{bio}</p>

                <ul>
                    <li>
                        <i class="fa-solid fa-calendar"></i>
                        Github criado em : {moment(createdAt).format("DD/MM/YYYY")}
                    </li>
                    <li>
                        <i className="fa-solid fa-building"></i>
                        {company}
                    </li>
                    <li>
                        <i className="fa-solid fa-location-dot"></i>
                        {location}
                    </li>
                    <li>
                        <a href={blog}>
                            <i className="fa-solid fa-link"></i>
                            {blog} 
                        </a>
                        
                    </li>
                </ul>
                <div>
                    <span>Follower: {followers}</span>
                    <span>Following: {following}</span> 
                </div>
                

            </div>
            
        </Section>
    )
}

export default Profile;