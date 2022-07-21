import { useEffect, useState } from 'react';
import axios from 'axios';
import ReposCard from './ReposCard';
import Section from '../Section/Section';
import styles from "./Repos.module.css"

const Repos = (url) => {
    const [repositories, setRepositories] = useState([]);

    async function setup() {
        try {
          const {data} = await axios.get('https://api.github.com/users/micah-maclean/repos');
          setRepositories(data)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(()=>{
    	setup();
    }, [])
    return(
        <Section>
            <div className={styles.repos}>
                {repositories.map( repository => (
                    <ReposCard key={repository.id}
                    name={repository.name} 
                    description={repository.description}
                    language={repository.language}
                    live={repository.repos_url}
                    lastUpdated ={repository.updated_at}
                    url={repository.html_url} 
                    />
                ))}  
            </div>
        </Section>        
    )
}

export default Repos;