import styled, { css } from "styled-components";
import { ButtonStyleProps } from "./interface";
export const ButtonContainer = styled.button<ButtonStyleProps>`
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${({ theme }) => theme.colors.DefaultColor};
  color: ${({ theme }) => theme.colors.ButtonText};
  transition: 0.5s;
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.HoverColor};
  }

  &:active {
    background: ${({ theme }) => theme.colors.ActiveColor};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.DisabledColor};
  }

  & > span {
    font-size: ${(props) => props.fontSize};
  }

  ${(props) =>
    props.btnType === "none" &&
    css`
      cursor: no-drop;

      &:hover {
        background: ${({ theme }) => theme.colors.DefaultColor};
      }

      &:active {
        background: ${({ theme }) => theme.colors.DefaultColor};
      }

      &:disabled {
        background: ${({ theme }) => theme.colors.DefaultColor};
      }
    `};
`;
