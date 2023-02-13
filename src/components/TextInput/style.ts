import { TextInputStyleProps } from "./interface";
import styled, { css } from "styled-components";

export const TextInputContainer = styled.div<TextInputStyleProps>`
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.DefaultText};
  font-size: ${(props) => props?.fontSize};
  label,
  input {
    color: inherit;
    font-size: inherit;
  }

  input {
    border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: 10px 0px;
    padding-left: 10px;

    &:active {
      border: 2px solid ${({ theme }) => theme.colors.ActiveColor};
    }

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.HoverColor};
    }
  }

  p {
    display: none;
  }

  ${(props) =>
    props.isError &&
    css`
      input {
        border: 2px solid ${({ theme }) => theme.colors.DefaultRed};
      }

      p {
        display: block;
        color: ${({ theme }) => theme.colors.DefaultRed};
      }
    `}
`;
