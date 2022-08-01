import {createContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { apiDBC, apiViaCEP } from '../api';

const AddressContext = createContext();

function AddressProvider({children}) {
    const navigate = useNavigate();

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
        console.log(error);
      }
    }

    async function handleDelete(idEndereco) {
        try {
          await apiDBC.delete(`/endereco/${idEndereco}`);
          toast.success('Endereço deletada com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        window.location.reload(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCreate(idPessoa, values) {
      try {
        await apiDBC.post(`/endereco/{idPessoa}?idPessoa=${idPessoa}`, values);
        toast.success('Endereço cadastrado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } catch (error) {
        console.log(error);
      }
    }

    async function handleUpdate(idEndereco, values) {
      try {
        await apiDBC.put(`/endereco/${idEndereco}`, values);
        toast.success('Endereço alterado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } catch (error) {
        
      }
    }

  return (
    <AddressContext.Provider value={{getAddressById, handleViaCep, handleDelete, handleCreate, handleUpdate}}>
        {children}
    </AddressContext.Provider>
  )
}


export {AddressProvider, AddressContext};