import { useContext, useEffect, useState } from "react"
import {Moment} from 'moment';
import {useParams} from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Container } from "../../components/container/Container";
import { PeopleContext } from "../../context/PeopleContext";
import { Button } from "../../components/button/Button";
import {dataMask, cpfMask} from "../../utils/Masks";
import { CustomForm } from "../../components/customForm/CustomForm";
import Loading from "../../components/loading/Loading";

function PeopleForm() {
  const {handleUpdatePerson, handleCreatePerson, getPersonById} = useContext(PeopleContext);
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [ isUpdate, setIsUpdate] = useState(false);
  const [ apiData, setApiData] = useState([]);

  async function setup() {
    setIsUpdate(true);
    const data = await getPersonById(id);
    setApiData(data);
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      setup();      
    } else {
      setLoading(false);
    }    
  }, [])
  
  if(loading) {
    return <Loading/>
  }

  return (
    <Container width={'calc(100% - 255px)'} height={'100vh'} padding={'40px 30px'}>
      <Formik
        initialValues = {{
          nome:  apiData.nome ,
          dataNascimento: apiData ? apiData.dataNascimento?.split('-').reverse().join('/') : '',
          cpf: apiData.cpf ? cpfMask(apiData.cpf) : '',
          email: apiData.email,
        }}
        enableReinitialize
        validationSchema = { Yup.object({
            nome: Yup.string().required(),
            dataNascimento: Yup.string().required(),
            cpf: Yup.string().min(14).max(14).required(),
            email: Yup.string().email().required(),
        })}
        onSubmit = {( values, {resetForm}) =>{
          values.dataNascimento = values.dataNascimento.split('/').reverse().join('-');
          values.cpf = values.cpf.replace(/\D/g, '');

          isUpdate ? handleUpdatePerson(id, values) : handleCreatePerson(values);
          
          resetForm({values: ''});
        }}
      >
        {({errors, touched, isSubmitting}) => (
            <CustomForm>
                <h2>{ isUpdate ? 'Atualizar Usuário' : 'Cadastrar Usuário'}</h2>

                <label>Nome*</label>
                <Field name='nome' placeholder='Nome' />
                { errors.nome && touched.nome && <span>{errors.nome}</span>}

                <label>Data de Nascimento*</label>
                <Field name='dataNascimento' placeholder='Data de Nascimento' onKeyUp={(e) => e.target.value = dataMask(e.target.value) }/>
                { errors.dataNascimento && touched.dataNascimento && <span>{errors.dataNascimento}</span>}

                <label>CPF*</label>
                <Field name='cpf' placeholder='CPF'  onKeyUp={(e) => e.target.value = cpfMask(e.target.value) }/>
                { errors.cpf && touched.cpf && <span>{errors.cpf}</span>}

                <label>Email*</label>
                <Field name='email' placeholder='Email' />
                { errors.email && touched.email && <span>{errors.email}</span>}

                <Button backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} width={'300px'} type="submit">{ isUpdate ? 'Atualizar' : 'Cadastrar'}</Button>  
            </CustomForm>
          
        )}
      </Formik>
    </Container>
  )
}
export default PeopleForm