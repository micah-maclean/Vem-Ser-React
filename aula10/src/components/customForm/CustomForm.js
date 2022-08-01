import { Form } from "formik";
import styled from "styled-components";

export const CustomForm = styled(Form)`
    align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};
    display: flex;
    flex-direction: column;
    align-items: ${props => props.alignItems ? props.alignItems : 'auto'};
    background-color: white;
    width: ${props => props.width ? props.width : '100%'};
    height: fit-content;
    padding: 40px 32px;
    border: 2px solid #DFE0EB;
    border-radius: 8px;



    select {
        border: 1px solid #F0F1F7;
        background-color: white;
        border-radius: 8px;
        padding: 12px 16px;
        width: 100%;  
    }

    input {
        border: 1px solid #F0F1F7;
        border-radius: 8px;
        padding: 12px 16px;
        width: 100%;  
    }

    label {
        width: 100%;
        font-weight: 700;
        color: #9FA2B4;
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 8px;
        margin-top: 24px;
    }

    span {
        width: 100%;
        font-size: 12px;
        margin-top: 4px;
        color: red;
    }

    button{
        margin-top: 20px;
        align-self: flex-end;
    }

    p{
        color: #9FA2B4;
        margin-top: 8px;
    }

    a{
        font-weight: 700;
        text-decoration: none;
        color: #3751FF;
    }
`;