import styled from "styled-components";
import { BoxStyleProps } from "./interface";
export const BoxContainer = styled.section<BoxStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.colors.BlackColor}; ;
`;
