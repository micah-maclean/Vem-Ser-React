import { createContext, useState, useEffect, useReducer } from "react"
import { apiDBC } from "../api";
import {toast} from "react-toastify"
import Loading from "../components/loading/Loading";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            apiDBC.defaults.headers.common['Authorization'] = token;  
            setToken(token) 
            setLoading(false);
        } else{
            setLoading(false);
        }
        
    }, []);

    async function handleLogin(values) {
        try {
            const {data} = await apiDBC.post('/auth', values); 
            localStorage.setItem('token', data);
            setToken(data);
            apiDBC.defaults.headers.common['Authorization'] = data; 
            window.location.href = '/';
        } catch (error) {
            toast.error(error.message);
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
            toast.error(error.message);
        }
    }

    if(loading) {
        return <Loading/>
    }

    return (
        <AuthContext.Provider value={{handleLogin, handleLogout, handleSignup, token, reducerValue, forceUpdate}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider, AuthContext};