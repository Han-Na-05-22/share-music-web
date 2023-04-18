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

  .add-music-loading {
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
  }

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
    color: ${({ theme }) => theme.colors.LightText};
    text-align: center;
    width: 100%;
    height: 50px;
    padding-left: 150px;
    line-height: 50px;
    border: none;

    &:hover,
    &:active {
      border: none !important;
    }
  }

  .music-title-singer {
    input {
      border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
      background: ${({ theme }) => theme.colors.ModalColor};
      color: ${({ theme }) => theme.colors.LightText};
      font-size: 12px;
      &:hover,
      &:active {
        border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
      }
    }
  }

  .music-explan {
    textarea {
      font-size: 12px;
    }
  }
  .music-mp3 {
    position: relative;
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: flex-end;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      &:hover,
      &:active {
        border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
      }
    }

    .add-info {
      position: absolute;
      bottom: -20px;
      left: 0px;
      font-size: 10px;
      transform: scale(0.8) translateX(-15px);

      color: ${({ theme }) => theme.colors.LightText};
    }

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
      color: ${({ theme }) => theme.colors.LightText};
      border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
      font-size: 12px;
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
        color: ${({ theme }) => theme.colors.DefaultText};
      }
      #mp3 {
        display: none;
      }
    }

    select {
      border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
      background: ${({ theme }) => theme.colors.ModalColor};
      color: ${({ theme }) => theme.colors.LightText};

      &:hover,
      &:active {
        border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
      }
    }
  }

  .btn-container {
    display: flex;
    gap: 0 50px;
  }

  @media screen and (max-width: 1660px) {
    width: 300px;
    height: 600px;
    padding: 20px 30px;

    .musics {
      width: 100%;
      gap: 40px 0px;
    }

    .music-infos.edit {
      height: 90%;

      .music-mp3 {
        height: 75px;
        margin-bottom: 0px;
      }

      .music-title-singer {
        input {
        }
      }
    }

    .music-img {
      width: 75px;
      height: 75px;

      div {
        height: 75px;
      }

      label {
        width: 100%;
        height: 75px;
      }

      .file-upload {
        svg {
          width: 75px;
          height: 75px;
        }
      }

      svg {
        top: 0px;
        right: 0px;
        transform: translate(0%);
        width: 20px;
        height: 20px;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 100px;
      }

      p {
        left: -5px;
        bottom: -5px;
        width: 100px;
      }
    }

    .music-name {
      height: 35px;
      width: 250px;
      padding-left: 0px;
      line-height: 1.5;
      font-size: 10px;
      -webkit-line-clamp: 1;
    }

    .music-title-singer {
      display: flex;
      flex-direction: column;
      gap: 15px 0px;
      label {
        font-size: 12px;
      }
    }

    .music-explan {
      margin-left: -10px;
      margin-bottom: 10px;
      label {
        font-size: 12px;
      }

      textarea {
        width: 250px;
        height: 50px;
      }
    }
    .music-mp3 {
      width: 250px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      position: relative;

      .mp3-name {
        font-size: 10px;
      }

      .add-info {
        position: absolute;
        bottom: 50px;
        left: 0px;
        font-size: 10px;
        color: ${({ theme }) => theme.colors.LightText};
      }

      select {
        position: absolute;
        width: 100%;
        height: 35px;
        bottom: 0px;
        font-size: 10px;
        left: 0px;
      }

      .add-mp3-input {
        margin-right: 15px;

        label {
          width: 75px;
          font-size: 12px;
          color: ${({ theme }) => theme.colors.DefaultText};
        }
      }

      .mp3s {
        padding-left: 10px;
        height: 35px;
        width: 175px;
        line-height: 35px;
        color: ${({ theme }) => theme.colors.LightText};
      }

      .mp3-error {
      }

      div {
        label {
          width: 100px;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
        }
        #mp3 {
          display: none;
        }
      }
    }

    .btn-container {
      display: flex;
      gap: 0 15px;

      button {
        width: 75px;
        height: 35px;

        span {
          font-size: 14px;
        }
      }
    }
  }
`;
