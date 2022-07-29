import { createContext, useState, useEffect } from "react"
import { apiDBC } from "../api";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            apiDBC.defaults.headers.common['Authorization'] = token;  
            setToken(token) 
        }
        setLoading(false);
    }, []);

    async function handleLogin(values) {
        try {
            const {data} = await apiDBC.post('/auth', values); 
            localStorage.setItem('token', data);
            setToken(data);
            apiDBC.defaults.headers.common['Authorization'] = data; 
            window.location.href = '/pessoas';
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        apiDBC.defaults.headers.common['Authorization'] = undefined;
        setToken(null);
        window.location.href = '/login';
    }

    async function handleSignup(values) {
        try {
            await apiDBC.post('/auth/create', values);
            alert('Usuário cadastrado com sucesso')
            window.location.href = '/login';
        } catch (error) {
            console(error);
        }
    }

    if(loading) {
        return (<h1>Loading</h1>)
    }
    return (
        <AuthContext.Provider value={{handleLogin, handleLogout, handleSignup, token}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider, AuthContext};