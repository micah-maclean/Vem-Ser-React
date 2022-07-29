import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { apiDBC } from "../api";


const PeopleContext = createContext();

function PeopleProvider({children}) {
    const navigate = useNavigate();
    const [pessoas, setPessoas] = useState();

    async function handleGetPeople() {
        try {
            const {data} = await apiDBC.get('/pessoa?pagina=0&tamanhoDasPaginas=20');
            setPessoas(data.content);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleGetPersonById(id) {
        try {
            const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=1`);
            console.log(data[0]);
            return data[0];
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreate(values) {
        try {
            await apiDBC.post('/pessoa', values);
            
            navigate('/pessoas')
        } catch (error) {
            console.log(error)
        }
    }
    
    async function handleDelete(id) {
        try {
            apiDBC.delete(`/pessoa/${id}`);
            toast.success('🦄 Wow so easy!', {
                position: "top-center",
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

        
    async function handleUpdate(values) {
        try {
            await apiDBC.put(`/pessoa/${1}`, values)
            navigate('/pessoas')
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <PeopleContext.Provider value={{handleDelete, handleUpdate, handleCreate, handleGetPeople, handleGetPersonById}}>
            {children}
        </PeopleContext.Provider>
    );
}

export {PeopleContext, PeopleProvider};