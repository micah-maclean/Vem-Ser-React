import { Field, Formik } from "formik";
import {Link, useNavigate} from 'react-router-dom';
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/Container";
import {CustomForm} from "../../components/customForm/CustomForm"

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

    useEffect( () => {
        if(token){
            navigate('/pessoas')
        }
    }, [])

    return (
        <Container backgroundColor={'#363740'} height={'100vh'}>
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
                    <CustomForm width={'400px'} alignSelf={'center'} alignItems={'center'}>
                        <h2>Cadastro</h2>

                        <label>Login</label>
                        <Field name='login' placeholder='Usuário'/>
                        {touched.login && errors.login && <span>{errors.login}</span>}
                    
                        <label>Senha</label>
                        <Field name='senha' placeholder='Senha' type='password' />
                        {touched.senha && errors.senha && <span>{errors.senha}</span>}
                  
                        <Button  width={'100%'} backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} type="submit">Cadastrar</Button> 
                        <p>Already have an account? <Link to='/login'>Log in</Link></p>
                    </CustomForm>
                )}
            </Formik>
        </Container>
    );
}

export default Signup;