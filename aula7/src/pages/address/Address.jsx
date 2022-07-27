import { Field, Form, Formik } from "formik";
import { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom"
import * as Yup from "yup";
import { apiViaCEP } from "../../api"
import { AuthContext } from "../../context/AuthContext"

const AddressSchema = Yup.object().shape({
  cep: Yup.number()
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
});

function Address() {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    !token && navigate('/')
    
  }, []);

  
  const [cep, setCep] = useState('');
  const [viaCep, setViaCep] = useState({});
  function maskCEP(e) {
    let valor = e.target.value.replace(/\D/g, '').replace().replace(/(\d{5})(\d)/, '$1-$2');
    setCep(valor)

    if(valor.length === 9){
      handleViaCep(valor);
    }
  }

  async function handleViaCep(value) {
    value = value.replace(/\.|\-/g, '')
    try {
      const {data} = await apiViaCEP.get(`/${value}/json/`)
      console.log(data)
      setViaCep(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Endereço</h2>
      <Formik
          initialValues = {{
            logradouro: '',
            numero: '',
            complemento: '',
            cep: '',
            cidade: '',
            estado: '',
          }}
          validationSchema={AddressSchema}
          onSubmit = { ( values, actions) => {
            console.log(values);
            actions.resetForm();
          }}
      >
        {({errors, touched}) => (
          <Form>
            <Field name='cep' placeholder='CEP' value={cep} onChange={maskCEP}/>
            { touched.cep && errors.cep && <div>{errors.cep}</div>}
            <br />
            <Field name='tipo' as='select'>
            <option value="COMERCIAL">Comercial</option>
            <option value="RESIDENCIAL">Residencial</option>
            </Field>
            { touched.tipo && errors.tipo && <div>{errors.tipo}</div>}
            <br />
            <Field name='logradouro' value={viaCep.logradouro} placeholder='Logradouro'/>
            { touched.logradouro && errors.logradouro && <div>{errors.logradouro}</div>}
            <br />
            <Field name='numero' placeholder='Número'/>
            { touched.numero && errors.numero &&  <div>{errors.numero}</div>}
            <br />
            <Field name='complemento' placeholder='Complemento'/>
            <br />
            <Field name='cidade' value={viaCep.localidade} placeholder='Cidade'/>
            { touched.cidade && errors.cidade && <div>{errors.cidade}</div>}
            <br />
            <Field name='estado' value={viaCep.uf} placeholder='Estado'/>
            { touched.estado && errors.estado && <div>{errors.estado}</div>}
            <br />
            <button type="submit">Enviar</button>
          </Form>
        )}
        
      </Formik>
    </>
  )
}
export default Address