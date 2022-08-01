import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    border: ${ props => props.border ? props.border: 'none'};
    border-radius: ${ props => props.borderRadius ? props.borderRadius: 'none'};
    flex-direction: ${ props => props.flexDirection ? props.flexDirection: 'row'};
    justify-content: ${ props => props.justifyContent ? props.justifyContent: 'center'};
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : '#F7F8FC'};
    padding: ${ props => props.padding ? props.padding : '0'};
    min-height: ${ props => props.minHeight ? props.minHeight : '0'};
    width: ${ props => props.width ? props.width : '100%'};
    height: ${ props => props.height ? props.height : '100%'};
    overflow: ${ props => props.overflow ? props.overflow : ''};
`;
