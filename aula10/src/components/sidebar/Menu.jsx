import { FaUser } from "react-icons/fa";

import Item from "./Item";
import { List } from "./Sidebar.styled";

function Menu() {

  return (
    <List>
        <Item text='Pessoas' route='/' icon={<FaUser />}/>
    </List>
  )
}
export default Menu;