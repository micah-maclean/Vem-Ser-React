import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();
function AuthProvider({children}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

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
    <AuthContext.Provider value={{login, setLogin, handleLogin}}>
        {children}
    </AuthContext.Provider>
  )
}
export  {AuthContext, AuthProvider};