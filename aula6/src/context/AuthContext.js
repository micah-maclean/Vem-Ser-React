import { createContext, useState } from "react"


const AuthContext = createContext();
function AuthProvider({children}) {
    const [login, setLogin] = useState(false);

  return (
    <AuthContext.Provider value={{login,setLogin}}>
        {children}
    </AuthContext.Provider>
  )
}
export  {AuthContext, AuthProvider};