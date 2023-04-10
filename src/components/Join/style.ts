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

    input {
      background: ${({ theme }) => theme.colors.ModalColor};
      color: ${({ theme }) => theme.colors.LightText};
    }

    .users {
      display: flex;
      gap: 0px 100px;
    }

    .user-img {
    }

    .user-name-id {
    }

    .user-phone-displayName {
    }
  }

  .btn-container {
    display: flex;
    gap: 0px 50px;
  }
  @media screen and (max-width: 1660px) {
    width: 300px;
    height: 650px;
    padding: 20px 40px;

    .user-infos {
      width: 100%;
      gap: 20px 0px;

      div {
        p {
          position: absolute;
          bottom: -2.5px;
          color: #999;
        }
        div {
          p {
            position: absolute;
            bottom: -2.5px;
            color: #999;
          }
        }
      }
      .users {
        flex-direction: column;
        gap: 0px 15px;
      }

      .user-img {
        div {
          width: 50px;
          height: 50px;

          .file-upload {
            svg {
              transform: translate(0%);
              top: 0px;
              left: 0px;
              width: 50px;
              height: 50px;
            }
          }
          svg {
            top: -5px;
            right: 0px;
            transform: translate(0%);
            width: 15px;
            height: 15px;
          }
        }
      }
      label {
        font-size: 12px;
        color: #444;
      }

      input {
        width: 225px;
        height: 30px;
        border: 2px solid ${({ theme }) => theme.colors.DisabledColor};

        &:hover,
        &:active {
          border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
        }
      }
      .user-name-id {
        div {
          margin-bottom: 15px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .user-phone-displayName {
        & > div {
          &:first-child {
            margin-bottom: 10px;
          }
        }
      }
    }

    .btn-container {
      display: flex;
      gap: 0px 10px;

      button {
        width: 70px;
        height: 30px;

        span {
          font-size: 14px;
        }
      }
    }
  }
`;
