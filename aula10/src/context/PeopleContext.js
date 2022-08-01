import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { apiDBC } from "../api";


const PeopleContext = createContext();

function PeopleProvider({children}) {
    const navigate = useNavigate();
    const [pessoas, setPessoas] = useState();

    async function getPeople() {
        try {
            const {data} = await apiDBC.get('pessoa/lista-completa');
            setPessoas(data.content);
        } catch (error) {
            console.log(error)
        }
    }

    async function getPersonById(id) {
        try {
            const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`);
            return data[0];
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreate(values) {
        try {
            await apiDBC.post('/pessoa', values);
            toast.success('Pessoa cadastrada com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    async function handleDelete(id) {
        try {
            await apiDBC.delete(`/pessoa/${id}`);
            toast.success('Pessoa deletada com sucesso!', {
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

        
    async function handleUpdate(id, values) {
        try {
            await apiDBC.put(`/pessoa/${id}`, values)
            toast.success('Perfil de pessoa alterado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <PeopleContext.Provider value={{handleDelete, handleUpdate, handleCreate, getPeople, getPersonById}}>
            {children}
        </PeopleContext.Provider>
    );
}

export {PeopleContext, PeopleProvider};