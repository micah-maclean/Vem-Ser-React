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

    td, th{
        text-align: left;
        padding: 26px 0;
    }

    th:last-child{
        text-align: center;
    }
`