import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";

const SignupSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, 'Nome de usuário curto de mais')
        .max(50, 'Nome de usuário longo de mais')
        .required('Campo obrigatório'),
    senha: Yup.string()
        .min(2, 'Senha curta de mais')
        .max(50, 'Senha longa de mais')
        .required('Campo obrigatório'),
});

function Signup() {
    const navigate = useNavigate();
    const {handleSignup, token} = useContext(AuthContext);

    useEffect(() => {
      token && navigate('/pessoas')
    }, []);

    return (
        <>
            <h2>Cadastro</h2>
            <Formik
                initialValues= {{
                    login: '',
                    senha: ''
                }}
                validationSchema={SignupSchema}
                onSubmit= { ( values, actions) => {
                    handleSignup(values)
                    actions.resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name='login' placeholder='Usuário'/>
                        {touched.login && errors.login && <div>{errors.login}</div>}
                        <br /><br />
                        <Field name='senha' placeholder='Senha' type='password'/>
                        {touched.senha && errors.senha && <div>{errors.senha}</div>}
                        <br /><br />
                        <button type="submit">Cadastrar</button> 
                    </Form>
                )}
                
            </Formik>
        </>
    );
}

export default Signup;