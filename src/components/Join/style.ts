import styled from "styled-components";
import { JoinStyleProps } from "./interface";

export const JoinContainer = styled.div<JoinStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .user-infos {
    width: 800px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .users {
      display: flex;
      gap: 0px 100px;
    }

    .user-img {
    }

    .user-name-id {
    }

    .user-phone-nickname {
    }
  }

  .btn-container {
    display: flex;
    gap: 0px 50px;
  }
`;
