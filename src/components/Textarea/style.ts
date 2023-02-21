import styled from "styled-components";
import { textareaStyleProps } from "./interface";

export const TextareaContainer = styled.div<textareaStyleProps>`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 10px 0px;

  textarea {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${({ theme }) => theme.colors.DefaultText};
    font-size: 18px;
    padding: 10px 0px 0px 10px;
  }

  label {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.HoverText};
  }
`;
