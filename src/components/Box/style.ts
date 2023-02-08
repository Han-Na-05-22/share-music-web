import styled from "styled-components";
import { BoxStyleProps } from "./interface";
export const BoxContainer = styled.section<BoxStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid red;
  color: #000;
`;
