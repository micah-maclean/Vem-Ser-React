import axios from "axios";

const apiDBC = axios.create({
    baseURL: 'https://dbc-pessoa-api.herokuapp.com'
});

const apiViaCEP = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

export {apiDBC, apiViaCEP};