import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const {login, setLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            login: '',
            senha: ''
        },
        onSubmit: values => {
            handleLogin(values)
        }
    });

    async function handleLogin(user) {
        try {
            const {data}= await api.post("/auth", user);
            localStorage.setItem('token', data)
            navigate("/usuarios");
            setLogin(true);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="login">Login</label>
        <input id="login" 
            name="login" 
            type="text" 
            onChange={formik.handleChange}
            value={formik.values.login} />
        <br />
        <label htmlFor="senha">Senha</label>
        <input id="senha" 
            name="senha" 
            type="password" 
            onChange={formik.handleChange}
            value={formik.values.senha} />
        <button type="submit">Entrar</button>
    </form>
  )
}
export default Login