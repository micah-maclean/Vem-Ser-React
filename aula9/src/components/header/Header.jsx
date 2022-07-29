import { useContext } from "react"
import Logo from "./Logo"
import Menu from "../sidebar/Menu";
import { AuthContext } from "../../context/AuthContext";
import { ContainerHeader } from "./Header.styled";
import { Button } from "../button/Button";

function Header() {
  const {handleLogout, token} = useContext(AuthContext);
  return (
    <>
      {token &&
        <ContainerHeader>
            <Logo/>
            <Menu/>
            <Button  height={'40px'} onClick={handleLogout}>Sair</Button>
        </ContainerHeader>
      }
    </>
  )
}
export default Header