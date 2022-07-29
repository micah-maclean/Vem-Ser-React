import { FaUser, FaRegCompass, FaAddressBook } from "react-icons/fa";

import Item from "./Item";

function Menu() {
  return (
    <ul>
        <Item text='Pessoas' route='/pessoas' icon={<FaUser />}/>
        <Item text='Endereço' route='/endereco' icon={<FaRegCompass/>}/>
        <Item text='Contato' route='/contato' icon={<FaAddressBook/>}/>

    </ul>
  )
}
export default Menu;