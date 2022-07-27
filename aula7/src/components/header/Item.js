import {Link} from 'react-router-dom';

function Item({title, url}) {
  return (
    <li>
      <Link to={url}>{title}</Link>
    </li>
  )
}
export default Item