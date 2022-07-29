import { useContext, useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";


import { Input } from "../../components/input/Input";
import { Container } from "../../components/container/Container";
import { PeopleContext } from "../../context/PeopleContext";
import { Button } from "../../components/button/Button";
import {dataMask, cpfMask} from "../../utils/Masks";

function PeopleForm() {
  const {handleUpdate, handleCreate, handleGetPersonById} = useContext(PeopleContext);
  const {id} = useParams();
  const [ isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if(id) {
       console.log(handleGetPersonById(id));
    }
  }, [])
  
  
  return (
    <Container>
      <h2>{id ? 'Atualizar Usuário' : 'Cadastrar Usuário'}</h2>
      <Formik
        initialValues = {{
          nome: '',
          dataNascimento: '',
          cpf: '',
          email: '',
        }}
        validationSchema = { Yup.object({
            nome: Yup.string().required(),
            dataNascimento: Yup.date().required(),
            cpf: Yup.number().required(),
            email: Yup.string().email().required(),
        })}
        onSubmit = {( values, {resetForm}) =>{
          values.dataNascimento = values.dataNascimento.split('/').reverse().join('-');
          values.cpf = values.cpf.replace(/\.|\-/g, '');
          if (id) {
            setIsUpdate(false);
            handleUpdate(values);
          } else {
            handleCreate(values);
          }
            console.log(values);
            resetForm({values: ''});
        }}
      >
        {({errors, touched, isSubmitting}) => (
            <Form>
                <label>Nome</label>
                <Field name='nome' placeholder='Nome' as={Input} />
                { errors.nome && touched.nome && <span>{errors.nome}</span>}

                <label>Data de Nascimento</label>
                <Field name='dataNascimento' placeholder='Data de Nascimento' as={Input} onKeyUp={(e) => e.target.value = dataMask(e.target.value) }/>
                { errors.dataNascimento && touched.dataNascimento && <span>{errors.dataNascimento}</span>}

                <label>CPF</label>
                <Field name='cpf' placeholder='CPF' as={Input} onKeyUp={(e) => e.target.value = cpfMask(e.target.value) }/>
                { errors.cpf && touched.cpf && <span>{errors.cpf}</span>}

                <label>Email</label>
                <Field name='email' placeholder='Email' as={Input}/>
                { errors.email && touched.email && <span>{errors.email}</span>}

                <Button backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} width={'300px'} type="submit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</Button>  
            </Form>
          
        )}
      </Formik>
    </Container>
  )
}
export default PeopleForm