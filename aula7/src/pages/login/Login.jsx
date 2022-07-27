import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";

const LoginSchema = Yup.object().shape({
    login: Yup.string()
        .required('Campo obrigatório'),
    senha: Yup.string()
        .required('Campo obrigatório'),
});

function Login() {
    const navigate = useNavigate();
    const {handleLogin, token} = useContext(AuthContext);

    useEffect(() => {
      token && navigate('/pessoas')
    }, []);

    return (
        <>
            <h2>Login</h2>
            <Formik
                initialValues= {{
                    login: '',
                    senha: ''
                }}
                validationSchema={LoginSchema}
                onSubmit= {( values, actions) => {
                    handleLogin(values);
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
                        <button type="submit">Login</button> 
                    </Form>
                )}
                
            </Formik>
        </> 
    );
}

export default Login;