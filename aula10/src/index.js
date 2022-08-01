import ReactDOM from 'react-dom/client';
import { Container } from './components/container/Container';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Routers from './Routers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Routers />  
);

