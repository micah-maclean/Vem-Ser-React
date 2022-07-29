import styled from "styled-components";

export const Button = styled.button( ({backgroundColor, color, width, height}) => ({
    cursor: "pointer",
    borderRadius: 8,
    padding: 8,
    backgroundColor,
    color,
    width,
    height,
}));