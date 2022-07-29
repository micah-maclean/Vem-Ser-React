import { Field, Form, Formik } from "formik";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import * as Yup from "yup";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/Container";
import { Input } from "../../components/input/Input";

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
    const {handleSignup} = useContext(AuthContext);

    return (
        <Container width={400}>
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
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label>Login</label>
                        <Field name='login' placeholder='Usuário' as={Input}/>
                        {touched.login && errors.login && <div>{errors.login}</div>}
                    
                        <label>Senha</label>
                        <Field name='senha' placeholder='Senha' type='password' as={Input}/>
                        {touched.senha && errors.senha && <div>{errors.senha}</div>}
                  
                        <Button  width={'100%'} backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} type="submit">Cadastrar</Button> 
                    </Form>
                )}
            </Formik>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </Container>
    );
}

export default Signup;