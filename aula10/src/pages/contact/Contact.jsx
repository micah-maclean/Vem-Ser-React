import { Field, Formik, useFormikContext} from "formik";
import { useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {ContactContext} from "../../context/ContactContext"
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import { CustomForm } from "../../components/customForm/CustomForm";
import Loading from "../../components/loading/Loading";
import { telefoneMask } from "../../utils/Masks";


const ContactSchema = Yup.object().shape({
  telefone: Yup.string()
      .required('Campo obrigatório'),
  tipoContato: Yup.string()
      .required('Campo obrigatório'),
  descricao: Yup.string()
      .required('Campo obrigatório'),
  
});

function Contact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {id, idContato} = useParams();
  const [isUpdate, setIsUpdate] = useState(false);


  const [apiData, setApiData] = useState({});
  const [values, setValues] = useState({});
  const { getContactById, handleCreateContact, handleUpdateContact} = useContext(ContactContext);

  async function setup() {
    setIsUpdate(true);
    const data= await getContactById(id, idContato);
    setApiData(data);
    setLoading(false);
  }
  
  useEffect(() => {
    if(idContato){
      setup();
    } else{
      setLoading(false);
    }
  }, [])

  function FormikContext() {
    const {values} = useFormikContext();
    setValues(values);
  }

  if(loading) {
    return <Loading></Loading>
  }
  
  return (
    <Container width={'calc(100% - 255px)'} padding={'40px 30px'}>
      
      <Formik
          initialValues = {{
            tipoContato:  apiData.tipoContato ? apiData.tipoContato : '',
            telefone: apiData.telefone ? telefoneMask(apiData.telefone)  : '',
            descricao: apiData.descricao ? apiData.descricao : '' ,
          }}
          enableReinitialize
          validationSchema={ContactSchema}
          onSubmit = { ( values, {resetForm}) => {
            values.telefone = values.telefone.replace(/\D/g, '');
            if(isUpdate){
              handleUpdateContact(id, idContato, values)
            } else {
              handleCreateContact(id, values)
            }
            resetForm({values: ''});
          }}
      >
        {({errors, touched}) => (
            <CustomForm>
              <FormikContext/>

              <h2>Contato</h2>

              <label>Telefone*</label>
              <Field name='telefone' placeholder='Telefone' onKeyUp={(e) => e.target.value = telefoneMask(e.target.value) }/>
              { touched.telefone && errors.telefone && <span>{errors.telefone}</span>}

              <label>Tipo de Telefone*:</label>
              <Field name='tipoContato' as='select'>
                <option>Escolha o tipo</option>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </Field>
              { touched.tipoContato && errors.tipoContato && <span>{errors.tipoContato}</span>}

              <label>Descrição*</label>
              <Field name='descricao' placeholder='Descrição' />
              { touched.descricao && errors.descricao && <span>{errors.descricao}</span>}

             

              <Button backgroundColor={'#3751FF'} color={'white'} width={'300px'} type="submit">Salvar</Button>
            </CustomForm>
        )}
      </Formik>
    </Container>
  )
}
export default Contact