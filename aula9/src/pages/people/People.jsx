import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Container } from "../../components/container/Container";
import List from "./components/List";
import PeopleForm from "./PeopleForm";
import { apiDBC } from "../../api";


function People() {
  const navigate = useNavigate();
  const [ pessoas, setPessoas] = useState([]);

  async function setup() {
    try {
        const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20');
        setPessoas(data.content);
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    setup();
  }, []);

  
  async function handleCreate() {
    navigate('/pessoas/criar')
  }

  return (
    <div>
      <Container>
        <h2>Cadastra usuario</h2>
        <button onClick={handleCreate}>Criar pessoa</button>
      </Container>
      
      <Container title='Lista Pessoas'>
        <h2>Lista Pessoas</h2>
        <List list={pessoas}/>
      </Container>
    </div>
  )
}
export default People