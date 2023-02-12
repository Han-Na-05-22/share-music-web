import { TextInputStyleProps } from "./interface";
import styled from "styled-components";

export const TextInputContainer = styled.div<TextInputStyleProps>`
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.DefaultText};

  label,
  input {
    color: inherit;
  }

  input {
    border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    &:active {
      border: 2px solid ${({ theme }) => theme.colors.ActiveColor};
    }

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.HoverColor};
    }
  }
`;
