import { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Field, Formik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button"
import { CustomForm } from "../../components/customForm/CustomForm";

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
        if(token){
          navigate('/')  
        }
    }, [])
    

    return (
        <Container backgroundColor={'#363740'} height={'100vh'}>
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
                    <CustomForm width={'400px'} alignSelf={'center'} alignItems={'center'}>
                        <h2>Log In to Dashboard Kit</h2>
                        <p>Enter your email and password below</p>
                        
                        <label>Login</label>
                        <Field name='login' placeholder='Usuário' />
                        {touched.login && errors.login && <span>{errors.login}</span>}

                        <label>Senha</label>
                        <Field name='senha' placeholder='Senha' type='password' />
                        {touched.senha && errors.senha && <span>{errors.senha}</span>}

                        <Button width={'100%'} backgroundColor={'#3751FF'} color={'white'} disabled={isSubmitting} type="submit">Log In</Button> 
                    
                        <p>Don't have an account? <Link to='/cadastro'>Sign up</Link></p>
                    </CustomForm>
                )}
            </Formik>
        </Container>   
    );
}

export default Login;