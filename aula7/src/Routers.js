import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/login/Login';
import SignUp from './pages/signUp/Signup';
import Address from './pages/address/Address';
import People from './pages/people/People';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function Routers() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <Header/>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/cadastro' element={<SignUp />} />
                <Route path='/endereco' element={<Address />} />
                <Route path='/pessoas' element={<People />} />
            </Routes>
            <Footer/>
        </AuthProvider>
    </BrowserRouter>
  )
}
export default Routers