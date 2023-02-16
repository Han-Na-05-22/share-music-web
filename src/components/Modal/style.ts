import styled from "styled-components";
import { ModalStyleProps } from "./interface";

export const ModalContainer = styled.div<ModalStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${({ theme }) => theme.colors.ModalColor};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.HoverText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-size: 28px;
  padding-bottom: 40px;

  .modal-header {
    width: 100%;
    height: 50px;
    background: ${({ theme }) => theme.colors.DisabledColor};
  }
`;
