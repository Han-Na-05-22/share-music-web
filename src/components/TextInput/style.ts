import { TextInputStyleProps } from "./interface";
import styled, { css } from "styled-components";

export const TextInputContainer = styled.div<TextInputStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  color: ${({ theme }) => theme.colors.BlackColor};
  font-size: ${(props) => props?.fontSize};

  &:active {
    input {
      border: 2px solid ${({ theme }) => theme.colors.ActiveColor};
    }
  }

  &:hover {
    input {
      border: 2px solid ${({ theme }) => theme.colors.HoverColor};
    }

    label {
      color: ${({ theme }) => theme.colors.BlackColor};
    }
  }

  label,
  input {
    color: ${({ theme }) => theme.colors.BlackColor};
    font-size: inherit;
  }

  input {
    border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: 10px 0px;
    padding-left: 10px;
    background: ${({ theme }) => theme.colors.BgColor};
    color: ${({ theme }) => theme.colors.DefaultText};

    &:focus-visible {
      outline-style: none;
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
        font-size: 10px;
        position: absolute;
        bottom: -10px;
        display: block;
        color: ${({ theme }) => theme.colors.DefaultRed};
      }

      label {
        color: ${({ theme }) => theme.colors.DefaultRed};
      }

      &:hover,
      &:active {
        input {
          border: 2px solid ${({ theme }) => theme.colors.DefaultRed};
        }

        p {
          font-size: 10px;
          position: absolute;
          bottom: -10px;
          display: block;
          color: ${({ theme }) => theme.colors.DefaultRed};
        }

        label {
          color: ${({ theme }) => theme.colors.DefaultRed};
        }
      }
      @media screen and (max-width: 1660px) {
        p {
          width: 300px;
          left: -15px;
          bottom: -5px;
          transform: scale(0.9);
        }
      }
    `}

  @media screen and (max-width: 1660px) {
    input {
      font-size: 12px;
      width: 250px;
      height: 35px;
    }
  }
`;
