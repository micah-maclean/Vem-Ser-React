import { FaUser} from "react-icons/fa";

import Item from "./Item";

function Menu() {
  return (
    <ul style={{listStyle:'none'}}>
        <Item text='Pessoas' route='/' icon={<FaUser />}/>
    </ul>
  )
}
export default Menu;