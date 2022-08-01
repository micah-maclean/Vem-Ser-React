import { useContext, useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom';
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import { PeopleContext } from "../../context/PeopleContext"
import { AddressContext } from "../../context/AddressContext";
import { Table } from "../../components/table/Table";
import Loading from "../../components/loading/Loading";

function PeopleDetails() {
  const navigate = useNavigate();
  const {getPersonById} = useContext(PeopleContext);
  const {handleDelete} = useContext(AddressContext);
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [ pessoa, setpessoa] = useState([]);

  async function setup() {
    const data = await getPersonById(id);
    setpessoa(data); 
    setLoading(false);   
  }

  useEffect(() => {
    setup(); 
  }, [])
  
  function handleCreateAddress() {
    navigate(`/pessoa/${id}/criar-endereco`)
  }

  function handleUpdateAddress(idEndereco) {
    navigate(`/pessoa/${id}/endereco/${idEndereco}/editar`)
  }

  function handleCreateContact() {
    navigate(`/pessoa/${id}/criar-contato`)
  }

  function handleUpdateContact(idContato) {
    navigate(`/pessoa/${id}/contato/${idContato}/editar`)
  }


  if(loading) {
    return <Loading></Loading>
  }

  return (
    <Container width={'calc(100% - 255px)'} overflow={'auto'} padding={'40px 30px'}>
      <Container flexDirection={'column'}   height={'fit-content'} padding={'24px 16px'} justifyContent={'flex-start'} border={'1px solid #DFE0EB'} borderRadius={'8px'} backgroundColor={'white'}>
        <h2>Detalhes da Pessoa</h2>
        <p>Nome: {pessoa.nome}</p> 
        <p>Data de Nascimento: {pessoa.dataNascimento}</p>
        <p>Nome: {pessoa.email}</p> 
        <p>Data de Nascimento: {pessoa.cpf}</p>

        <Container height={'36px'} justifyContent={'space-between'} backgroundColor={'white'}>
          <h2>Endereço da pessoa</h2>
          <Button height={'36px'} backgroundColor={'#29CC97'} color={'white'} border={'none'} onClick={handleCreateAddress}> + Adicionar</Button>
        </Container>

        <Table width={'100%'}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Logradouro</th>
              <th>Numero</th>
              <th>Complemento</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Pais</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              pessoa.enderecos.map( endereco => (
                <tr key={endereco.idEndereco}>
                  <td>{endereco.tipo}</td>
                  <td>{endereco.logradouro}</td>
                  <td>{endereco.numero}</td>
                  <td>{endereco.complemento}</td>
                  <td>{endereco.cidade}</td>
                  <td>{endereco.estado}</td>
                  <td>{endereco.pais}</td>
                  <td>
                    <Container  justifyContent={'space-around'} backgroundColor={'white'}>
                      <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => handleUpdateAddress(endereco.idEndereco)}>Editar</Button>
                      <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => handleDelete(endereco.idEndereco)}>Deletar</Button>
                    </Container>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>

        {pessoa.enderecos.length === 0 && <p>Nenhum endereço</p>}

        <Container  justifyContent={'space-between'} backgroundColor={'white'}>
          <h2>Contato da pessoa</h2>
          <Button height={'36px'} backgroundColor={'#29CC97'} color={'white'} border={'none'} > + Adicionar</Button>
        </Container>

        {/* <Table width={'100%'}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Telefone</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              pessoa.contatos.map( contato => (
                <tr>
                  <td>{contato.tipoContato}</td>
                  <td>{contato.telefone}</td>
                  <td>{contato.descricao}</td>
                  <td>
                    <Container  justifyContent={'space-around'} backgroundColor={'white'}>
                      <Button border={'none'} height={'36px'} backgroundColor={'#FEC400'} color={'white'} onClick={() => handleUpdateAddress(contato.idContato)}>Editar</Button>
                      <Button border={'none'} height={'36px'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => handleDelete(contato.idContato)}>Deletar</Button>
                    </Container>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table> */}
        {pessoa.contatos.length === 0 && <p>Nenhum contatos</p>}
      </Container>
      
    </Container>  
  )
}

export default PeopleDetails