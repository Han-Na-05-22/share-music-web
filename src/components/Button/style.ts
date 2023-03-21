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
  margin-left: ${(props) => props.marginLeft};

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
      cursor: not-allowed;

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

  ${(props) =>
    props.btnType === "confirm" &&
    css`
      background: ${({ theme }) => theme.colors.DisabledColor};
    `};

  @media screen and (max-width: 1660px) {
    height: 40px;
    width: 100px;
    font-size: 12px;

    label {
      font-size: 12px;
    }

    input {
      font-size: 10px;
    }

    ul {
      li {
        span {
          font-size: 12px;
        }
      }
    }

    span,
    strong,
    p,
    b {
      font-size: 12px;
    }
    & > span {
      font-size: 12px;
    }
  }
`;
