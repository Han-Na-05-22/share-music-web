import styled from "styled-components";
import { MusicDetailStyleProps } from "./interface";

export const MusicDetailContainer = styled.div<MusicDetailStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 70px;
  flex-direction: column;
`;
