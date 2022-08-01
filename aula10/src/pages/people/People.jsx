import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import List from "./components/List";
import { apiDBC } from "../../api";
import Loading from "../../components/loading/Loading";


function People() {
  const navigate = useNavigate();
  const [ loading, setLoading] = useState(true);
  const [ pessoas, setPessoas] = useState([]);

  async function setup() {
    try {
        const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20');
        setPessoas(data.content);
    } catch (error) {
        console.log(error)
    }
  } //TODO

  useEffect(() => {
    setup();
    setLoading(false);
  }, []);

  
  async function handleCreate() {
    navigate('/criar-pessoa')
  }

  if(loading) {
    return <Loading></Loading>
  }

  return (
    <Container backgroundColor={'#E5E5E5'} width={'calc(100% - 255px)'} padding={'40px 30px'} overflow={'auto'}>
      <Container height={'fit-content'} flexDirection={'column'} justifyContent={'center'}  border={'1px solid #DFE0EB'} borderRadius={'8px'} padding={'30px'}>   
        <Container  justifyContent={'space-between'} height={'fit-content'} padding={'16px 0'}>
          <h2>Lista Pessoas</h2>
          <Button backgroundColor={'#29CC97'} onClick={handleCreate}> Criar pessoa </Button>
        </Container>
        
        <List list={pessoas}/>
      </Container>
    </Container>
  )
}
export default People