import { useContext } from "react"
import Logo from "./Logo"
import Menu from "./Menu"
import { AuthContext } from "../../context/AuthContext";
import { ContainerHeader } from "./Header.styled";

function Header() {
  const {handleLogout, token} = useContext(AuthContext);
  return (
    <ContainerHeader>
        <Logo/>
        <Menu/>
        {token && <button onClick={handleLogout}>Sair</button>}
    </ContainerHeader>
  )
}
export default Header