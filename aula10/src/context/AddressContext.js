import {createContext, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { apiDBC, apiViaCEP } from '../api';
import { AuthContext } from './AuthContext';

const AddressContext = createContext();

function AddressProvider({children}) {
    const navigate = useNavigate();
    const {forceUpdate} = useContext(AuthContext);

    async function getAddressById(idEndereco) {
      try {
        const {data} = await apiDBC.get(`/endereco/${idEndereco}`)
        return data;
      } catch (error) {
        console.log(error)
      }
    }

    async function handleViaCep(value) {
      try {
        const {data} = await apiViaCEP.get(`/${value}/json/`);
        return data;
      } catch (error) {
        toast.error(error);
      }
    }

    async function handleDeleteAddress(idEndereco) {
        try {
          await apiDBC.delete(`/endereco/${idEndereco}`);
          toast.success('Endereço deletada com sucesso!');
          forceUpdate();
        } catch (error) {
          toast.error(error);
        }
    }

    async function handleCreateAddress(idPessoa, values) {
      try {
        await apiDBC.post(`/endereco/{idPessoa}?idPessoa=${idPessoa}`, values);
        toast.success('Endereço cadastrado com sucesso!');
        forceUpdate();
        navigate(`/pessoa/${idPessoa}`)
      } catch (error) {
        toast.error(error);
      }
    }

    async function handleUpdateAddress(idPessoa, idEndereco, values) {
      try {
        await apiDBC.put(`/endereco/${idEndereco}`, values);
        toast.success('Endereço alterado com sucesso!');
        forceUpdate();
        navigate(`/pessoa/${idPessoa}`);
      } catch (error) {
        toast.error(error);
      }
    }

  return (
    <AddressContext.Provider value={{getAddressById, handleViaCep, handleDeleteAddress, handleCreateAddress, handleUpdateAddress}}>
        {children}
    </AddressContext.Provider>
  )
}


export {AddressProvider, AddressContext};