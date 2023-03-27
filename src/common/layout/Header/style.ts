import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px 0px;
  padding: 40px 40px 0px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  background: #1b1b1bff;

  .header-top,
  .header-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-top {
    position: relative;

    & > h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      gap: 0px 7.5px;
      position: absolute;
      transform: translateY(-50%);
      left: 0px;
      top: 50%;

      span {
        font-size: 20px;
      }
      svg {
        width: 25px;
        height: 25px;
        position: relative;
        top: -2.5px;
        transform: rotateZ(-5deg);
      }
    }

    .search {
      display: flex;
      gap: 0px 25px;
      justify-content: space-around;
      align-items: center;
    }

    .auth-container {
      .auth-content.join {
        flex-direction: row;
        gap: 0px 15px;
      }

      .auth-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        right: 0px;
        gap: 15px 0px;
        transform: translateY(-50%);
        top: 50%;

        strong {
          cursor: pointer;
          opacity: 0.8;
          transition: 0.3s;

          &:hover {
            font-weight: bold;
            opacity: 1;
          }
        }

        .auth-profile {
          display: flex;
          gap: 0px 15px;
          justify-content: flex-end;
          align-items: center;

          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }

          span {
            font-size: 12px;
          }
        }

        .auth-btn-container {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 0px 10px;
          font-size: 10px;
        }
      }
    }
  }

  .header-bottom {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .add-music {
      position: absolute;
      right: 0px;
      bottom: 15px;
    }
  }

  @media screen and (max-width: 950px) {
    .header-top {
      position: relative;
      h1 {
        svg {
          width: 25px;
          height: 25px;
        }
      }

      .search {
        gap: 0px 10px;

        input {
          width: 175px;
          padding: 0px 5px;
        }

        select {
          width: 75px;
          height: 35px !important;
        }
      }

      .my-info-submit {
        width: 50px;
        height: 35px;
      }

      .add-music {
        width: 75px;
      }
    }

    .header-bottom {
      justify-content: flex-start;

      .auth-content {
        gap: 0px 20px;

        strong {
          font-size: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    .header-top {
      position: relative;
      h1 {
        svg {
          width: 25px;
          height: 25px;
        }
      }

      .search {
        gap: 0px 10px;
        input {
          width: 150px;
          padding: 0px 5px;
        }

        select {
          width: 100px;
          height: 35px;
        }
      }

      .my-info-submit {
        width: 100px;
        @media screen and (max-width: 750px) {
          width: 50px;
        }
      }

      .add-music {
      }
    }
  }
`;
