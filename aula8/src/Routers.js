import { useContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Login from './pages/login/Login';
import SignUp from './pages/signUp/Signup';
import Address from './pages/address/Address';
import People from './pages/people/People';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';


function Routers() {
  const {token} = useContext(AuthContext);

  return (
    <BrowserRouter>
            <Header/>
            <Routes>
              {!token ? 
                <>
                  <Route path='/' element={<Login/>} />
                  <Route path='/cadastro' element={<SignUp />} />
                </>
              : <>
                  <Route path='/endereco' element={<Address />} />
                  <Route path='/pessoas' element={<People />} /> 
                </>
              }
              <Route path='*' element={<NotFound/>} />
             </Routes>   
            <Footer/>
    </BrowserRouter>
  )
}
export default Routers