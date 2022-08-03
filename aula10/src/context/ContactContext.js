import { createContext, useContext } from "react";
import { apiDBC } from "../api";
import {toast} from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ContactContext = createContext();

function ContactProvider({children}) {
    const navigate = useNavigate();
    const {forceUpdate} = useContext(AuthContext);

    async function getContactById(idPessoa, idContato) {
        try {
            const {data} = await apiDBC.get(`/contato/${idPessoa}`)
            return data.filter( contato =>  contato.idContato == idContato)[0];
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleCreateContact(idPessoa, values) {
        try {
            await apiDBC.post(`/contato/${idPessoa}`, values);
            toast.success('Contato cadastrada com sucesso!');
            forceUpdate();
            navigate(`/pessoa/${idPessoa}`);
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    async function handleUpdateContact(idPessoa, idContato, values) {
        try {
            await apiDBC.put(`/contato/${idContato}`, values)
            toast.success('Contato alterado com sucesso!');
            forceUpdate();
            navigate(`/pessoa/${idPessoa}`);
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleDeleteContact(idContato) {
        try {
            await apiDBC.delete(`/contato/${idContato}`);
            toast.success('Contato excluido com sucesso!');
            forceUpdate();
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <ContactContext.Provider value={{getContactById, handleCreateContact, handleUpdateContact, handleDeleteContact}}>
        {children}
    </ContactContext.Provider>
  )
}
export {ContactProvider, ContactContext};