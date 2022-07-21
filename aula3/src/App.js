import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Profile from './components/Profile/Profile';
import Repos from './components/Repos/Repos';

function App() {
  const [apiResponse, setApiResponse] = useState({});

  const BASE_URL = 'https://api.github.com';
  async function setup() {
    try {
      const {data} = await axios.get(`${BASE_URL}/users/micah-maclean`)
      setApiResponse(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    	setup();
  }, [])
  return (
    <main className={styles.app}>
      <Profile 
        photo={apiResponse.avatar_url}
        name={apiResponse.name} 
        user={apiResponse.login}  
        bio={apiResponse.bio} 
        createdAt={apiResponse.created_at}
        company={apiResponse.company}
        location={apiResponse.location}
        blog={apiResponse.blog} 
        followers={apiResponse.followers}
        following={apiResponse.following} />
      <Repos url={apiResponse.repos_url} />
    </main>
  );
}

export default App;
