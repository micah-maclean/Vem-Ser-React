import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PeopleProvider } from './context/PeopleContext';
import {ToastContainer} from 'react-toastify'

import Address from './pages/address/Address';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import People from './pages/people/People';
import PeopleForm from './pages/people/PeopleForm';
import SignUp from './pages/signUp/Signup';
import PrivateRoutes from './utils/PrivateRoutes';
import Contact from './pages/contact/Contact';

function Routers() {
  return (
    <BrowserRouter className="routers">
      <AuthProvider>
        <PeopleProvider>
          <Header/>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/contato' element={<Contact />} />
              <Route path='/endereco' element={<Address />} />
              <Route path='/pessoas' element={<People />} /> 
              <Route path='/pessoas/criar' element={<PeopleForm/>} /> 
              <Route path='/pessoas/editar/:id' element={<PeopleForm />} /> 
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='/cadastro' element={<SignUp />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>   
        </PeopleProvider>
      </AuthProvider>     
    </BrowserRouter>
  )
}

export default Routers;