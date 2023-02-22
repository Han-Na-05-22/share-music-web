import styled from "styled-components";
import { PopUpStyleProps } from "./interface";

export const PopUpContainer = styled.div<PopUpStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
