import {Link} from 'react-router-dom';

function Item({text, route, icon}) {
  return (
    <li>
      <Link to={route}>
        {icon} {text}
      </Link>  
    </li>
    
  )
}
export default Item