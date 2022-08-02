import styled from "styled-components";
import { Link } from "react-router-dom";

export const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;

    li{
        text-align: center;
        padding: 18px 0;
    }

    a {
        color: #A4A6B3;
        text-decoration: none;
        font-size: 16px;
    }

    a > *:first-child{
        margin-right: 12px;
    }

    a:hover{
        color: white;
    }
`;

export const LogoLink = styled(Link)`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 60px;

    color: #A4A6B3;
    text-decoration: none;
`;

export const Linebreaker = styled.hr`
    border: 1px solid #A4A6B3;
    margin: 24px 0;
    width: 100%;
`;