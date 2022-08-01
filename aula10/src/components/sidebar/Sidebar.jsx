import Menu from "./Menu";
import { Button } from "../button/Button";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react"
import { Container } from "../container/Container";

function Sidebar() {
  const {handleLogout, token} = useContext(AuthContext);
  return (
   <>
      { token && 
        <Container padding={'20px'} height={'100vh'} width={'255px'} backgroundColor={'#363740'} flexDirection={'column'} justifyContent={'space-around'}>
            <Menu/>
            <Button  color={'white'} width={'100%'} onClick={handleLogout}>Sair</Button>
        </Container>  
      }
   </>
  )
}
export default Sidebar