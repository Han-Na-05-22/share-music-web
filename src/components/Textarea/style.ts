import styled, { css } from "styled-components";
import { textareaStyleProps } from "./interface";

export const TextareaContainer = styled.div<textareaStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;

  &:active {
    textarea {
      border: 2px solid ${({ theme }) => theme.colors.ActiveColor};
    }
  }

  &:hover {
    textarea {
      border: 2px solid ${({ theme }) => theme.colors.HoverColor};
    }
    label {
      color: ${({ theme }) => theme.colors.BlackColor};
    }
  }

  textarea {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${({ theme }) => theme.colors.LightText};
    font-size: 18px;
    padding: 10px 0px 0px 10px;
    border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
  }

  label {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.BlackColor};
  }

  ${(props) =>
    props.isError &&
    css`
      textarea {
        border: 2px solid ${({ theme }) => theme.colors.DefaultRed};
      }

      p {
        display: block;
        font-size: 10px;
        color: ${({ theme }) => theme.colors.DefaultRed};
      }

      label {
        color: ${({ theme }) => theme.colors.DefaultRed};
      }
    `}

  @media screen and (max-width: 1660px) {
    textarea {
      font-size: 12px;
    }
  }
`;
