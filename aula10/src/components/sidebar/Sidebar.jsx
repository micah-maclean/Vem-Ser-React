import Menu from "./Menu";
import Logo from "./Logo";
import { Linebreaker } from "./Sidebar.styled";
import { Button } from "../button/Button";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react"
import { Container } from "../container/Container";

function Sidebar() {
  const {handleLogout, token} = useContext(AuthContext);
  return (
   <>
      { token && 
        <Container  padding={'64px 8px'} height={'100vh'} alignItems={'center'} width={'255px'} backgroundColor={'#363740'} flexDirection={'column'} justifyContent={'flex-start'}>
            <Logo/>
            <Menu/>
            <Linebreaker />
            <Button  color={'white'} width={'calc(100% - 12px)'} onClick={handleLogout}>Sair</Button>
        </Container>  
      }
   </>
  )
}
export default Sidebar