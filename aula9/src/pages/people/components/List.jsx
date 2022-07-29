import { useContext } from "react"
import {useNavigate} from 'react-router-dom';
import { PeopleContext } from "../../../context/PeopleContext";

import { Table, Row, Header } from "./List.styled"
import {cpfMask} from "../../../utils/Masks"

function List({list}) {
  const navigate = useNavigate();
  const {handleDelete, handleGet} = useContext(PeopleContext);


  async function handleUpdate(id) {
    navigate(`/pessoas/editar/${id}`)
  }

  return (
    <Table>
        <Header>
            <p>Nome</p>
            <p>Email</p>
            <p>CPF</p>
            <p>Data de Nascimento</p>
            <p>Ações</p>
        </Header>
        {list.map(pessoa => (
            <Row key={pessoa.idPessoa}>
                <p>{pessoa.nome}</p>
                <p>{pessoa.email}</p>
                <p>{cpfMask(pessoa.cpf)}</p>
                <p>{pessoa.dataNascimento}</p>
                <div>
                  <button onClick={() => handleDelete(pessoa.idPessoa)}>Deletar</button>
                  <button onClick={() => handleUpdate(pessoa.idPessoa)}>Atualizar</button>
                </div>
            </Row>
        ))}
    </Table>
  )
}
export default List