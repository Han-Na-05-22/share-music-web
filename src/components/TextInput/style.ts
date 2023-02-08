import { TextInputStyleProps } from "./interface";
import styled from "styled-components";

export const TextInputContainer = styled.div<TextInputStyleProps>`
  border: 2px solid yellow;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
