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
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .musics {
    width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .music-img {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100px;
    }
  }

  .music-name {
    color: ${({ theme }) => theme.colors.DefaultText};
    width: 800px;
    text-align: center;
    height: 50px;
    padding-left: 150px;
    line-height: 50px;
  }

  .music-title-singer {
  }

  .music-explan {
  }
  .music-mp3 {
    position: relative;
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: flex-end;

    .add-mp3-input {
      margin-right: 30px;
    }

    .mp3s {
      padding-left: 10px;
      height: 50px;
      width: 500px;
      line-height: 50px;
      position: relative;
      display: flex;
      color: ${({ theme }) => theme.colors.DefaultText};
      border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
    }

    .mp3-error {
      color: ${({ theme }) => theme.colors.DefaultRed};
      font-size: 10px;
      border: 2px solid ${({ theme }) => theme.colors.DefaultRed};
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        width: 150px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        border: none;
        background: ${({ theme }) => theme.colors.DefaultColor};
        color: ${({ theme }) => theme.colors.ButtonText};
      }
      #mp3 {
        display: none;
      }
    }
  }

  .btn-container {
    display: flex;
    gap: 0 50px;
  }
`;
