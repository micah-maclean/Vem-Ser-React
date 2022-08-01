import {Link} from 'react-router-dom';

function Item({text, route, icon}) {
  return (
    <li>
      <Link style={{color: 'white', textDecoration: 'none', fontSize: '16px'}}to={route}>{icon}    {text}</Link>  
    </li>
    
  )
}
export default Item