import { Field, Form, Formik, useFormikContext} from "formik";
import { useState} from "react";
import * as Yup from "yup";
import { apiViaCEP } from "../../api"

import {Button} from "../../components/button/Button"
import { Container } from "../../components/container/Container";
import { Input } from "../../components/input/Input";

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
    <Container>
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
              <label>CEP</label>
              <Field name='cep' placeholder='CEP' onKeyUp={maskCEP} as={Input}/>
              { touched.cep && errors.cep && <div>{errors.cep}</div>}

              <label>Tipo de Residência:</label>
              <Field name='tipo' as='select'>
              <option value="COMERCIAL">Comercial</option>
              <option value="RESIDENCIAL">Residencial</option>
              </Field>
              { touched.tipo && errors.tipo && <div>{errors.tipo}</div>}

              <label>Logradouro</label>
              <Field name='logradouro' placeholder='Logradouro' as={Input}/>
              { touched.logradouro && errors.logradouro && <div>{errors.logradouro}</div>}

              <label>Número</label>
              <Field name='numero' placeholder='Número' as={Input}/>
              { touched.numero && errors.numero &&  <div>{errors.numero}</div>}

              <label>Complemento</label>
              <Field name='complemento' placeholder='Complemento' as={Input}/>

              <label>Cidade</label>
              <Field name='cidade' placeholder='Cidade' as={Input} />
              { touched.cidade && errors.cidade && <div>{errors.cidade}</div>}

              <label>Estado</label>
              <Field name='estado' placeholder='Estado' as={Input}/>
              { touched.estado && errors.estado && <div>{errors.estado}</div>}

              <Button type="submit">Enviar</Button>
            </Form>
        )}
      </Formik>
    </Container>
  )
}
export default Address