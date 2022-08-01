import { createContext } from "react";
import { apiDBC } from "../api";

const ContactContext = createContext();

function ContactProvider({children}) {

    async function getContactById(idContato) {
        try {
            apiDBC.get(`/contato/${idContato}`)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreate(idPessoa, values) {
        try {
            apiDBC.post(`/contato/${idPessoa}`, values);
        } catch (error) {
            console.log(error)
        }
    }
    
    async function handleUpdate(idContato, values) {
        try {
            apiDBC.delete(`/contato/${idContato}`, values)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(idContato) {
        try {
            apiDBC.delete(`/contato/${idContato}`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <ContactContext.Provider value={{getContactById, handleCreate, handleUpdate, handleDelete}}>
        {children}
    </ContactContext.Provider>
  )
}
export {ContactProvider, ContactContext};