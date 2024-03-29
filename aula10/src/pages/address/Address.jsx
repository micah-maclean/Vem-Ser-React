import { Field, Formik, useFormikContext} from "formik";
import { useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { apiViaCEP } from "../../api"

import {Button} from "../../components/button/Button"
import { Container } from "../../components/container/Container";
import { CustomForm } from "../../components/customForm/CustomForm";
import Loading from "../../components/loading/Loading";
import { AddressContext } from "../../context/AddressContext";
import { cepMask } from "../../utils/Masks";

const AddressSchema = Yup.object().shape({
  cep: Yup.string()
      .required('Campo obrigatório'),
  tipo: Yup.string()
      .required('Campo obrigatório'),
  logradouro: Yup.string()
      .required('Campo obrigatório'),
  numero: Yup.string()
      .required('Campo obrigatório'),
  cidade: Yup.string()
      .required('Campo obrigatório'),
  estado: Yup.string()
      .required('Campo obrigatório'),
  pais: Yup.string()
      .required('Campo obrigatório'),
});

function Address() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { getAddressById, handleCreateAddress, handleUpdateAddress} = useContext(AddressContext);
  const {id, idEndereco} = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [apiData, setApiData] = useState({});
  const [values, setValues] = useState({});

  async function setup() {
    setIsUpdate(true)
   const data = await getAddressById(idEndereco);
   setApiData(data);
   setLoading(false);
  }

  useEffect(() => {
    if(idEndereco){
      setup();
    } else{
      setLoading(false);
    }
  }, [])
  
  function FormikContext() {
    const {values} = useFormikContext();
    setValues(values);
  }

  function maskCEP(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');

    if(e.target.value.length === 9){
      handleViaCep(e.target.value);
    }   
  }

  async function handleViaCep(value) {
    value = value.replace(/\.|\-/g, '')
    
    try {
      const {data} = await apiViaCEP.get(`/${value}/json/`)
      values.logradouro = data.logradouro;
      values.cidade = data.localidade;
      values.estado = data.uf;
    } catch (error) {
      toast.error(error.message);
    }
  }

  if(loading) {
    return <Loading></Loading>
  }

  return (
    <Container width={'calc(100% - 255px)'} padding={'40px 30px'} overflow={'auto'}>
      
      <Formik
          initialValues = {{
            logradouro:  apiData.logradouro,
            tipo: apiData.tipo,
            numero: apiData.numero,
            complemento: apiData.complemento,
            cep: apiData.cep ? cepMask(apiData.cep) : '',
            cidade: apiData.cidade,
            estado: apiData.estado,
            pais: apiData.pais,
          }}
          validationSchema={AddressSchema}
          onSubmit = { ( values, {resetForm}) => {
            values.cep = values.cep.replace(/\D/g, '');
            const newValues = {
              idPessoa: id,
              tipo: values.tipo,
              logradouro: values.logradouro,
              numero: values.numero,
              complemento: values.complemento,
              cep: values.cep,
              cidade: values.cidade,
              estado: values.estado,
              pais: values.pais,
            }
            
            isUpdate ? handleUpdateAddress(id, idEndereco, newValues) : handleCreateAddress(id, newValues);

            resetForm({values: ''});
          }}
      >
        {({errors, touched}) => (
            <CustomForm>
              <FormikContext/>

              <h2>Endereço</h2>

              <label>CEP*</label>
              <Field name='cep' placeholder='CEP' onKeyUp={maskCEP}/>
              { touched.cep && errors.cep && <span>{errors.cep}</span>}

              <label>Tipo de Residência*:</label>
              <Field name='tipo' as='select'>
                <option>Escolha o tipo</option>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </Field>
              { touched.tipo && errors.tipo && <span>{errors.tipo}</span>}

              <label>Logradouro*</label>
              <Field name='logradouro' placeholder='Logradouro' />
              { touched.logradouro && errors.logradouro && <span>{errors.logradouro}</span>}

              <label>Número*</label>
              <Field name='numero' placeholder='Número' />
              { touched.numero && errors.numero &&  <span>{errors.numero}</span>}

              <label>Complemento</label>
              <Field name='complemento' placeholder='Complemento' />

              <label>Cidade*</label>
              <Field name='cidade' placeholder='Cidade'/>
              { touched.cidade && errors.cidade && <span>{errors.cidade}</span>}

              <label>Estado*</label>
              <Field name='estado' placeholder='Estado' />
              { touched.estado && errors.estado && <span>{errors.estado}</span>}

              <label>Pais*</label>
              <Field name='pais' placeholder='Pais' />
              { touched.pais && errors.pais && <span>{errors.pais}</span>}

              <Button backgroundColor={'#3751FF'} color={'white'} width={'300px'} type="submit">Salvar</Button>
            </CustomForm>
        )}
      </Formik>
    </Container>
  )
}
export default Address