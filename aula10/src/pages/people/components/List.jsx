import { useContext } from "react"
import {useNavigate} from 'react-router-dom';
import { PeopleContext } from "../../../context/PeopleContext";


import { cpfMask } from "../../../utils/Masks"
import { Button } from "../../../components/button/Button";
import { Container } from "../../../components/container/Container";
import { Table } from "../../../components/table/Table";

function List({list}) {
  const navigate = useNavigate();
  const {handleDelete} = useContext(PeopleContext);


  async function handleUpdate(id) {
    navigate(`/pessoa/${id}/editar`)
  }

  async function handleView(id) {
    navigate(`/pessoa/${id}`);
  }

  return (
    <Container>
      <Table width={'100%'}>
        <thead>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Ações</th>
        </thead>

        <tbody>
          {
            list.map( pessoa => (
              <tr>
                <td >{pessoa.nome}</td>
                <td>{pessoa.email}</td>
                <td>{cpfMask(pessoa.cpf)}</td>
                <td>{pessoa.dataNascimento}</td>
                <td style={{display:'flex', justifyContent: 'space-around'}}>
                  <Button border={'none'}  backgroundColor={'#3751FF'} color={'white'} onClick={() => handleView(pessoa.idPessoa)}>Visualizar</Button>
                  <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => handleDelete(pessoa.idPessoa)}>Deletar</Button>
                  <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => handleUpdate(pessoa.idPessoa)}>Atualizar</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
    
  )
}
export default List