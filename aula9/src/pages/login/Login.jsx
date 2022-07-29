import { useContext } from "react";
import {Link} from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { CustomForm } from "../../components/customForm/CustomForm";

const LoginSchema = Yup.object().shape({
    login: Yup.string()
        .required('Campo obrigatório'),
    senha: Yup.string()
        .required('Campo obrigatório'),
});

function Login() {
    const {handleLogin} = useContext(AuthContext);

    return (

            <Container width={400}>
                <h2>Log In to Dashboard Kit</h2>
                <p>Enter your email and password below</p>
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
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <label>Login</label>
                            <Field name='login' placeholder='Usuário' as={Input}/>
                            {touched.login && errors.login && <div>{errors.login}</div>}

                            <label>Senha</label>
                            <Field name='senha' placeholder='Senha' type='password' as={Input}/>
                            {touched.senha && errors.senha && <div>{errors.senha}</div>}

                            <Button width={'100%'} backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} type="submit">Login</Button> 
                        </Form>
                    )}
                </Formik>
                <p>Don't have an account? <Link to='/cadastro'>Signup</Link></p>
            </Container>   
    );
}

export default Login;