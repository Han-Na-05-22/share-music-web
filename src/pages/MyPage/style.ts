import styled from "styled-components";

// todo : 반응형 중복인 부분 삭제해야함!!

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 65px 40px 160px;

  .tabel-container {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    div {
      &:nth-child(2) {
        bottom: 30px;
        position: absolute;
      }
    }

    tbody {
      td {
        svg {
          &:hover {
            path {
              transition: 0.2s;
              fill-opacity: 1;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    display: flex;
    width: 100%;
    padding: 75px 40px 170px;
    justify-content: space-evenly;

    @media screen and (max-width: 1150px) {
      justify-content: space-between;
    }
    .user-info-container {
      min-height: 810px;
      width: 550px;
      min-width: 550px;
      padding: 85px 40px;
      position: relative;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      @media screen and (max-width: 1350px) {
        width: 425px;
        min-width: 425px;
      }

      .my-info-edit {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .input-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 30px 0px;
          gap: 30px 0px;

          & > div {
            width: 100%;

            &:last-child {
              input {
                margin-bottom: 0px;
              }
            }
          }
          input {
            width: 100%;
            height: 50px;
            margin: 10px 0px 20px;
            font-size: 14px;
          }

          label {
            font-size: 14px;
            color: ${({ theme }) => theme.colors.DefaultText};
          }
        }

        .my-img {
          svg {
            width: 75px;
            height: 75px;
            transform: translate(0);
          }

          .delete-icon {
            width: 15px;
            height: 15px;
          }
        }

        .mine {
          gap: 0px 20px;
          display: flex;
        }

        .my-info-submit {
          width: 150px;
          height: 50px;
          span {
            font-size: 16px;
          }
        }
      }
    }
    .tabel-container {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      min-height: 810px;
      position: relative;
      div {
        width: 550px;

        @media screen and (max-width: 1350px) {
          width: 425px;
        }

        &:nth-child(1) {
          min-height: 810px;
        }
        &:nth-child(2) {
          bottom: 25px;
          position: absolute;
        }
      }

      table {
        tr {
          th,
          td {
            &:nth-child(3) {
              width: 200px;
            }

            &:nth-child(4) {
              width: 100px;
            }
          }
        }
      }

      tbody {
        td {
          svg {
            height: 15px;
            width: 15px;
            &:hover {
              path {
                transition: 0.2s;
                fill-opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 950px) {
    display: flex;
    width: 100%;
    padding: 75px 40px 180px;
    justify-content: center;
    flex-wrap: wrap;
    gap: 80px 0px;
    flex-direction: column;

    .user-info-container {
      min-height: 100%;
      width: 100%;
      min-width: 100%;
      padding: 85px 40px;
      position: relative;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      .my-info-edit {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .input-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 30px 0px;
          gap: 30px 0px;

          & > div {
            height: 100%;
            width: 100%;

            &:last-child {
              input {
                margin-bottom: 0px;
              }
            }
          }
          input {
            width: 100%;
            height: 50px;
            margin: 10px 0px 20px;
            font-size: 14px;
          }

          label {
            font-size: 14px;
            color: ${({ theme }) => theme.colors.DefaultText};
          }
        }

        .my-img {
        }

        .mine {
          gap: 0px 20px;
          display: flex;
        }

        .my-info-submit {
          width: 150px;
          height: 50px;
          span {
            font-size: 16px;
          }
        }
      }
    }
    .tabel-container {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      div {
        width: 100%;

        &:nth-child(2) {
          bottom: 25px;
          position: absolute;
        }
      }

      table {
      }

      tbody {
        td {
          svg {
            width: 20px;
            height: 20px;
            &:hover {
              path {
                transition: 0.2s;
                fill-opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    display: flex;
    width: 100%;
    padding: 75px 20px 180px;
    justify-content: center;
    flex-wrap: wrap;
    gap: 80px 0px;
    flex-direction: column;

    .user-info-container {
      width: 100%;
      min-width: 100%;
      padding: 40px 20px;
      position: relative;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      .my-info-edit {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .input-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 30px 0px;
          gap: 20px 0px;

          & > div {
            width: 100%;

            &:last-child {
              input {
                margin-bottom: 0px;
              }
            }
          }
          input {
            width: 100%;
            height: 40px;
            margin: 10px 0px 20px;
            font-size: 12px;
          }

          label {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.DefaultText};
          }
        }

        .my-img {
        }

        .mine {
          gap: 0px 20px;
          display: flex;
        }

        .my-info-submit {
          width: 100px;
          height: 35px;
          span {
            font-size: 12px;
          }
        }
      }
    }
    .tabel-container {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      div {
        width: 100%;
        padding: 15px 10px;
        &:nth-child(2) {
          bottom: 15px;
          position: absolute;

          button {
            width: 20px;
            height: 20px;
            font-size: 10px;
          }
        }
      }

      table {
      }

      tbody {
        td {
          svg {
            width: 15px;
            height: 15px;
            &:hover {
              path {
                transition: 0.2s;
                fill-opacity: 1;
              }
            }
          }
        }
      }
    }
  }
`;
