import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { apiDBC } from "../api";
import { AuthContext } from "./AuthContext";


const PeopleContext = createContext();

function PeopleProvider({children}) {
    const {forceUpdate} = useContext(AuthContext);
    const navigate = useNavigate();

    async function getPeople() {
        try {
            const {data} = await apiDBC.get('/pessoa/lista-completa');
            return data;
        } catch (error) {
           toast.error(error.message);
        }
    }

    async function getPersonById(id) {
        try {
            const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`);
            return data[0];
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleCreatePerson(values) {
        try {
            await apiDBC.post('/pessoa', values);
            toast.success('Pessoa cadastrada com sucesso!');
            forceUpdate();
            navigate('/');

        } catch (error) {
            toast.error(error.message);
        }
    }
    
    async function handleDeletePerson(id) {
        try {
            await apiDBC.delete(`/pessoa/${id}`);
            toast.success('Pessoa excluida com sucesso!'); 
            forceUpdate();

        } catch (error) {
            toast.error(error.message);
        } 
       
    }

        
    async function handleUpdatePerson(id, values) {
        try {
            await apiDBC.put(`/pessoa/${id}`, values)
            toast.success('Pessoa alterada com sucesso!');
            forceUpdate();
            navigate('/');
            
        } catch (error) {
            toast.error(error.message);
        }
    };

    return(
        <PeopleContext.Provider value={{handleDeletePerson, handleUpdatePerson, handleCreatePerson, getPeople, getPersonById}}>
            {children}
        </PeopleContext.Provider>
    );
}

export {PeopleContext, PeopleProvider};