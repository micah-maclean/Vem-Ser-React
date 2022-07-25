import {useContext} from 'react';
import { CountContext } from '../context/CountContext';

function Mirror() {
    const {count} = useContext(CountContext);
    return (
      <div>
          <p>Mirror:  {count}</p>
      </div> 
    )
}
export default Mirror