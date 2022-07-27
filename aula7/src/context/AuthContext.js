import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiDBC } from "../api";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token')); 
    const navigate = useNavigate();

    async function handleLogin(values) {
        try {
            const {data} = await apiDBC.post('/auth', values); 
            localStorage.setItem('token', data);
            setToken(data)
            navigate('/pessoas')
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    }

    async function handleSignup(values) {
        try {
            await apiDBC.post('/auth/create', values);
            alert('Usuário cadastrado com sucesso.')
            navigate('/');
        } catch (error) {
            console(error);
        }
    }

    return (
        <AuthContext.Provider value={{handleLogin, handleLogout, handleSignup, token}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider, AuthContext};