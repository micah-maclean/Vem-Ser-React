import { useContext } from "react"
import {useNavigate} from 'react-router-dom';
import { PeopleContext } from "../../../context/PeopleContext";
import {confirmAlert} from 'react-confirm-alert';

import { cpfMask, transformData } from "../../../utils/Masks"
import { Button } from "../../../components/button/Button";
import { Container } from "../../../components/container/Container";
import { Table } from "../../../components/table/Table";

function List({list}) {
  const navigate = useNavigate();
  const {handleDeletePerson} = useContext(PeopleContext);


  function deletePerson(id) {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que quer deletar pessoa.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeletePerson(id)
        },
        {
          label: 'No'
        }
      ]
    });

  }

 function updatePerson(id) {
    navigate(`/pessoa/${id}/editar`)
  }

  function viewPerson(id) {
    navigate(`/pessoa/${id}`);
  }

  return (
    <Container>
      <Table width={'100%'}>
        <thead>
          <tr>
           <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th> 
          </tr>
        </thead>

        <tbody>
          {
            list.map( pessoa => (
              <tr>
                <td >{pessoa.nome}</td>
                <td>{pessoa.email}</td>
                <td>{cpfMask(pessoa.cpf)}</td>
                <td>{transformData(pessoa.dataNascimento)}</td>
                <td>
                  <Container backgroundColor={'none'} justifyContent={'space-around'}>
                    <Button border={'none'}  backgroundColor={'#3751FF'} color={'white'} onClick={() => viewPerson(pessoa.idPessoa)}>Visualizar</Button>
                    <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => deletePerson(pessoa.idPessoa)}>Deletar</Button>
                    <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => updatePerson(pessoa.idPessoa)}>Atualizar</Button>
                  </Container>
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