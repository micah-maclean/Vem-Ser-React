import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Item from './Item';

function Menu() {
  const {token} = useContext(AuthContext);
  return (
    <ul>
      {/* Se logado aparece endereço e pessoas, caso contrario só aparece login e cadastro*/}
      { !token 
        ? (<><Item title="Login" url="/" />
        <Item title="Cadastro" url="/cadastro" /></>)
        : (<><Item title="Pessoas" url="pessoas" />
        <Item title="Endereço" url="endereco" />
        </>)

      }
      
      
    </ul>
  );
}
export default Menu;