import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    margin: 16px 0;
    
    thead{
        color: #9FA2B4;
        border-bottom: 2px solid #DFE0EB;
    }

    tr:not(:last-child){
        border-bottom: 2px solid #DFE0EB; 
    }

    tr:not(thead > tr):hover{
        cursor: pointer;
        background-color:rgba(55, 81, 255, 0.04);
    }

    th{
        text-align: left;
        padding-bottom: 12px; 
    }

    td{
        text-align: left;
        padding: 26px 0; 
    }

    td:first-child, th:first-child {
        padding-left: 32px;
    }

    td:last-child, th:last-child {
        padding-right: 32px;
    }

    th:last-child{
        text-align: center;
    }
`