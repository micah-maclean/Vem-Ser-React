import { useContext } from "react"
import Logo from "./Logo"
import Menu from "./Menu"
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const {handleLogout, token} = useContext(AuthContext);
  return (
    <header>
        <Logo/>
        <Menu/>
        {token && <button onClick={handleLogout}>Sair</button>}
    </header>
  )
}
export default Header