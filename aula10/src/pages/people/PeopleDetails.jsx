import { useContext, useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';

import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import { Table } from "../../components/table/Table";
import Loading from "../../components/loading/Loading";


import { cpfMask, telefoneMask, transformData } from "../../utils/Masks";

import { AuthContext } from "../../context/AuthContext";
import { PeopleContext } from "../../context/PeopleContext"
import { AddressContext } from "../../context/AddressContext";
import { ContactContext } from "../../context/ContactContext";
function PeopleDetails() {
  const navigate = useNavigate();
  const {reducerValue} = useContext(AuthContext);
  const {getPersonById} = useContext(PeopleContext);
  const {handleDeleteAddress } = useContext(AddressContext);
  const {handleDeleteContact } = useContext(ContactContext);
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
  }, [reducerValue]);
  
  function createAddress() {
    navigate(`/pessoa/${id}/criar-endereco`)
  }

  function deleteAddress(idEndereco) {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que quer deletar pessoa.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteAddress(idEndereco)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  function updateAddress(idEndereco) {
    navigate(`/pessoa/${id}/endereco/${idEndereco}/editar`)
  }

  function createContact() {
    navigate(`/pessoa/${id}/criar-contato`)
  }

  function updateContact(idContato) {
    navigate(`/pessoa/${id}/contato/${idContato}/editar`)
  }

  function deleteContact(idEndereco) {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que quer deletar pessoa.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteContact(idEndereco)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  if(loading) {
    return <Loading/>
  }

  return (
    <Container width={'calc(100% - 255px)'} overflow={'auto'} padding={'40px 30px'}>
      <Container flexDirection={'column'}   height={'fit-content'} padding={'24px 16px'} justifyContent={'flex-start'} border={'1px solid #DFE0EB'} borderRadius={'8px'} backgroundColor={'white'}>
        <h2>Detalhes da Pessoa</h2>
        <p>Nome: <span>{pessoa.nome}</span></p> 
        <p>Data de Nascimento: <span>{transformData(pessoa.dataNascimento)}</span></p>
        <p>Email: <span>{pessoa.email}</span></p> 
        <p>CPF: <span>{cpfMask(pessoa.cpf)}</span></p>

        <Container height={'36px'} justifyContent={'space-between'} backgroundColor={'none'}>
          <h2>Endereço da pessoa</h2>
          <Button backgroundColor={'#29CC97'} color={'white'} border={'none'} onClick={createAddress}> + Adicionar</Button>
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
                    <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                      <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => updateAddress(endereco.idEndereco)}>Editar</Button>
                      <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => deleteAddress(endereco.idEndereco)}>Deletar</Button>
                    </Container>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>

        {pessoa.enderecos.length === 0 && <p>Nenhum endereço</p>}

        <Container justifyContent={'space-between'} align-items={'center'} backgroundColor={'none'}>
          <h2>Contato da pessoa</h2>
          <Button backgroundColor={'#29CC97'} color={'white'} border={'none'} onClick={createContact} > + Adicionar</Button>
        </Container>

        <Table width={'100%'}>
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
                <tr key={contato.idContato}>
                  <td>{contato.tipoContato}</td>
                  <td>{telefoneMask(contato.telefone)}</td>
                  <td>{contato.descricao}</td>
                  <td>
                    <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                      <Button border={'none'} height={'36px'} backgroundColor={'#FEC400'} color={'white'} onClick={() => updateContact(contato.idContato)}>Editar</Button>
                      <Button border={'none'} height={'36px'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => deleteContact(contato.idContato)}>Deletar</Button>
                    </Container>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        {pessoa.contatos.length === 0 && <p>Nenhum contatos</p>}
      </Container>
      
    </Container>  
  )
}

export default PeopleDetails