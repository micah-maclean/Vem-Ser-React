import { Field, Form, Formik, useFormikContext} from "formik";
import { useState} from "react";
import * as Yup from "yup";
import { apiViaCEP } from "../../api"

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
});

function Address() {
  const [values, setValues] = useState();

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
            <FormikContext/>
            <Field name='cep' placeholder='CEP' onKeyUp={maskCEP}/>
            { touched.cep && errors.cep && <div>{errors.cep}</div>}
            <br />
            <Field name='tipo' as='select'>
            <option value="COMERCIAL">Comercial</option>
            <option value="RESIDENCIAL">Residencial</option>
            </Field>
            { touched.tipo && errors.tipo && <div>{errors.tipo}</div>}
            <br />
            <Field name='logradouro' placeholder='Logradouro'/>
            { touched.logradouro && errors.logradouro && <div>{errors.logradouro}</div>}
            <br />
            <Field name='numero' placeholder='Número'/>
            { touched.numero && errors.numero &&  <div>{errors.numero}</div>}
            <br />
            <Field name='complemento' placeholder='Complemento'/>
            <br />
            <Field name='cidade' placeholder='Cidade'/>
            { touched.cidade && errors.cidade && <div>{errors.cidade}</div>}
            <br />
            <Field name='estado' placeholder='Estado'/>
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