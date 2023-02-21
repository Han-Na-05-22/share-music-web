import styled, { css } from "styled-components";
import { textareaStyleProps } from "./interface";

export const TextareaContainer = styled.div<textareaStyleProps>`
  border: 1px solid red;
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
      color: ${({ theme }) => theme.colors.HoverText};
    }
  }

  textarea {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${({ theme }) => theme.colors.DefaultText};
    font-size: 18px;
    padding: 10px 0px 0px 10px;
  }

  label {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.DefaultText};
  }

  ${(props) =>
    props.isError &&
    css`
      textarea {
        border: 2px solid ${({ theme }) => theme.colors.DefaultRed};
      }

      p {
        display: block;
        color: ${({ theme }) => theme.colors.DefaultRed};
      }

      label {
        color: ${({ theme }) => theme.colors.DefaultRed};
      }
    `}
`;
