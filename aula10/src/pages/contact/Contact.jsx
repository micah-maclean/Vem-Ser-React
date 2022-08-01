import { Field, Formik, useFormikContext} from "formik";
import { useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {ContactContext} from "../../context/ContactContext"
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import { CustomForm } from "../../components/customForm/CustomForm";


const ContactSchema = Yup.object().shape({
  telefone: Yup.string()
      .required('Campo obrigatório'),
  tipo: Yup.string()
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
  const { getContactById, handleCreate, handleUpdate} = useContext(ContactContext);

  async function setup() {
    setIsUpdate(true);
    const data= await getContactById(idContato);
    setLoading(false);
  }
  
  useEffect(() => {
    if(idContato){
      setup();
    } else{
      setLoading(false);
    }
  }, [])
  

  function maskTelefone(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  }

  function FormikContext() {
    const {values} = useFormikContext();
    setValues(values);
  }
  
  return (
    <Container width={'calc(100% - 255px)'} padding={'40px 30px'}>
      
      <Formik
          initialValues = {{
            tipo:  apiData.tipo,
            telefone: apiData.telefone,
            descricao: apiData.descricao,
          }}
          validationSchema={ContactSchema}
          onSubmit = { ( values, {resetForm}) => {
            values.telefone = values.telefone.replace(/\D/g, '');
            if(isUpdate){
              handleUpdate(idContato, values)
            } else {
              handleCreate(id, values)
            }
            console.log(values);
            resetForm({values: ''});
            navigate(`/pessoa/${id}`)
          }}
      >
        {({errors, touched}) => (
            <CustomForm>
              <FormikContext/>

              <h2>Contato</h2>

              <label>Telefone</label>
              <Field name='telefone' placeholder='Telefone' onKeyUp={maskTelefone}/>
              { touched.telefone && errors.telefone && <span>{errors.telefone}</span>}

              <label>Tipo de Telefone:</label>
              <Field name='tipo' as='select'>
                <option>Escolha o tipo</option>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </Field>
              { touched.tipo && errors.tipo && <span>{errors.tipo}</span>}

              <label>Descrição</label>
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