import styled from "styled-components";
import { AddMusicStyleProps } from "./interface";
export const AddMusicContainer = styled.section<AddMusicStyleProps>`
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
  padding: 40px;

  .music-infos {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }

  .musics {
    width: 800px;
    height: 75px;
    border: 1px solid red;
    div {
      input {
        height: 60px;
        margin-bottom: 0px;
      }
    }
  }

  .music-title-singer {
    display: flex;
  }

  .music-mp3 {
    color: #000;
    position: relative;
    align-items: flex-end;
    justify-content: space-between;
    display: flex;
    p {
      padding-left: 10px;
      line-height: 100px;
      width: 600px;
      height: 100%;
      color: ${({ theme }) => theme.colors.HoverText};
    }

    strong {
      left: 0px;
      color: ${({ theme }) => theme.colors.HoverText};
      position: absolute;
      top: 0px;
      font-size: 18px;
    }
  }
`;
