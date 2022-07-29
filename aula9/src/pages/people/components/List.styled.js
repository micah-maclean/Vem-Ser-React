import styled from "styled-components";

export const Table= styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;

    border: 2px solid #DFE0EB;
    border-radius: 8px;
`;

export const Row = styled.li`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 26px 32px;

    :nth-child(2) {
        border-top: 2px solid #DFE0EB;
    }

    :not(:last-child) {
        border-bottom: 2px solid #DFE0EB;
    }

    &:hover {
        cursor: pointer;
        background: rgba(55, 81, 255, 0.04);
    }
`;

export const Header = styled.li`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 32px;
    color: #9FA2B4;
`;