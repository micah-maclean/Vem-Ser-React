import { useEffect, useState } from "react"
import { Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { apiDBC } from "../../api";
import { CustomForm } from "./People.styled";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const PersonSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Campo Obrigatório"),
  email: Yup.string().email()
    .required("Campo Obrigatório"),
  cpf: Yup.string()
    .required("Campo Obrigatório"),
  dataNascimento: Yup.string()
    .required("Campo Obrigatório"),
});


function People() {
  const [ values, setValues] = useState({});
  const [ pessoas, setPessoas] = useState([]);
  const [ isUpdate, setIsUpdate] = useState(false);
  const [ idPessoa, setIdPessoa] = useState(null);

  function FormikContext() {
    const {values} = useFormikContext();
    setValues(values);
  }

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

  async function handleCreate(values) {
    values.dataNascimento = values.dataNascimento.split('/').reverse().join('-');
    values.cpf = values.cpf.replace(/\.|\-/g, '');
    console.log(values)
    try {
        await apiDBC.post('/pessoa', values);
    } catch (error) {
        console.log(error)
    }
  }

  async function handleDelete(id) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Tem certeza que quer deletar?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            try {
              apiDBC.delete(`/pessoa/${id}`);
            } catch (error) {
              console.log(error);
            }}
        },
        {
          label: 'No',
        }
      ]
    });
     
  }

  function setUpdate(pessoa) {
    setIdPessoa(pessoa.idPessoa)
    setIsUpdate(true);
    values.nome = pessoa.nome;
    values.email = pessoa.email;
    values.dataNascimento = pessoa.dataNascimento;
    values.cpf = pessoa.cpf;
  }

  async function handleUpdate(values) {
    values.cpf = values.cpf.replace(/\.|\-/g, '');
    try {
      await apiDBC.put(`/pessoa/${idPessoa}`, values)
    } catch (error) {
        console.log(error)
    }
  }

    function cpfMask(e) {
      e.target.value = e.target.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3}).(\d{3}).(\d{3})(\d)/, '$1.$2.$3-$4'); 
    }

    function dataMask(e) {
      e.target.value = e.target.value.replace(/\D/g, '')
           .replace(/(\d{2})(\d)/, '$1/$2')
           .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3'); 
    }

  return (
    <div>
      <h2>Cadastra Pessoa</h2>
      <Formik
        initialValues={{
          nome: '',
          dataNascimento: '',
          cpf: '',
          email: '',
        }}
        validationSchema={PersonSchema}
        onSubmit= {( values, actions) =>{
          values.dataNascimento = values.dataNascimento.split('/').reverse().join('-');
          values.cpf = values.cpf.replace(/\.|\-/g, '');
          if (isUpdate) {
            setIsUpdate(false);
            handleUpdate(values);
          } else {
            handleCreate(values);
          }
            console.table(values);
            actions.resetForm();
        }}
      >
        {({errors, touched}) => (
          <Form>
            <CustomForm>
                <FormikContext/>
                <Field name='nome' placeholder='Nome'/>
                { errors.nome && touched.nome && <span>{errors.nome}</span>}

                <Field name='dataNascimento' placeholder='Data de Nascimento' onKeyUp={dataMask}/>
                { errors.dataNascimento && touched.dataNascimento && <span>{errors.dataNascimento}</span>}

                <Field name='cpf' placeholder='CPF' onKeyUp={cpfMask}/>
                { errors.cpf && touched.cpf && <span>{errors.cpf}</span>}

                <Field name='email' placeholder='Email'/>
                { errors.email && touched.email && <span>{errors.email}</span>}

                <button type="submit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</button>  
            </CustomForm>
          </Form>
        )}
      </Formik>
      <h2>Lista Pessoas</h2>
      {pessoas.map(pessoa => (
        <div key={pessoa.idPessoa}>
          <p>Nome: {pessoa.nome}</p>
          <p>Email: {pessoa.email}</p>
          <p>CPF: {pessoa.cpf}</p>
          <p>Data de Nascimento: {pessoa.dataNascimento}</p>
          <button onClick={() => handleDelete(pessoa.idPessoa)}>Deletar</button>
          <button onClick={() => setUpdate(pessoa)}>Atualizar</button>
        </div>
      ))}
    </div>
  )
}
export default People