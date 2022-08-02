import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PeopleProvider } from './context/PeopleContext';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Address from './pages/address/Address';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import People from './pages/people/People';
import PeopleForm from './pages/people/PeopleForm';
import Sidebar from './components/sidebar/Sidebar'
import SignUp from './pages/signUp/Signup';
import PrivateRoutes from './utils/PrivateRoutes';
import Contact from './pages/contact/Contact';
import { Container } from './components/container/Container';
import PeopleDetails from './pages/people/PeopleDetails';
import { AddressProvider } from './context/AddressContext';
import { ContactProvider } from './context/ContactContext';

function Routers() {
  return (
    <BrowserRouter className="routers">
      <AuthProvider>
        <PeopleProvider>
          <AddressProvider>
            <ContactProvider>
              <Container height={'100vh'} overflow={'hidden'}>
                <Sidebar/>
                <ToastContainer
                  position="top-right"
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
                    <Route path='/' element={<People />} />
                    <Route path='/criar-pessoa' element={<PeopleForm/>} /> 
                    <Route path='/pessoa/:id' element={<PeopleDetails />} /> 
                    <Route path='/pessoa/:id/editar/' element={<PeopleForm />} /> 
                    <Route path='/pessoa/:id/criar-endereco' element={<Address />} />
                    <Route path='/pessoa/:id/endereco/:idEndereco/editar' element={<Address />} />
                    <Route path='/pessoa/:id/criar-contato' element={<Contact />} />
                    <Route path='/pessoa/:id/contato/:idContato/editar' element={<Contact />} />
                  </Route>
                  <Route path='/login' element={<Login/>} />
                  <Route path='/cadastro' element={<SignUp />} />
                  <Route path='/*' element={<NotFound />} />
                </Routes>   
              </Container>
            </ContactProvider>
          </AddressProvider>
        </PeopleProvider>
      </AuthProvider>     
    </BrowserRouter>
  )
}

export default Routers;