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

    .add-info {
      position: absolute;
      bottom: 50px;
      left: 0px;
      font-size: 10px;
      color: ${({ theme }) => theme.colors.HoverText};
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

  @media screen and (max-width: 1660px) {
    width: 300px;
    height: 600px;
    padding: 20px 30px;

    .musics {
      width: 100%;
      gap: 40px 0px;
    }

    .music-img {
      width: 75px;
      height: 70px;

      div {
        height: 70px;
      }

      label {
        width: 100%;
        height: 50px;
      }

      .file-upload {
        svg {
          width: 50px;
          height: 50px;
        }
      }

      svg {
        top: -5px;
        right: 20px;
        transform: translate(0%);
        width: 20px;
        height: 20px;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 100px;
      }

      p {
        left: -5px;
        bottom: -5px;
        width: 100px;
      }
    }

    .music-name {
      width: 100%;
      height: 35px;
      padding-left: 0px;
      line-height: 35px;
      font-size: 12px;
    }

    .music-title-singer {
      display: flex;
      flex-direction: column;
      gap: 25px 0px;
      margin-bottom: 15px;
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
      margin-bottom: 15px;
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
        }
      }

      .mp3s {
        padding-left: 10px;
        height: 35px;
        width: 175px;
        line-height: 35px;
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
