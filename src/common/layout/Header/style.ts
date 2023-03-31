import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px 0px;
  padding: 40px 40px 0px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  background: ${({ theme }) => theme.colors.BgColor};
  position: relative;

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

      &:hover {
        span {
          color: ${({ theme }) => theme.colors.ActiveColor};
        }

        svg {
          top: -5px;
          path {
            fill: ${({ theme }) => theme.colors.ActiveColor};
          }
        }
      }
      span {
        font-size: 20px;
        color: ${({ theme }) => theme.colors.DefaultColor};
      }

      svg {
        width: 25px;
        height: 25px;
        position: relative;
        top: -2.5px;
        transform: rotateZ(-5deg);
        transition: 0.3s;

        path {
          fill: ${({ theme }) => theme.colors.DefaultColor};
        }
      }
    }

    .search {
      display: flex;
      gap: 0px 25px;
      justify-content: space-around;
      align-items: center;
      color: ${({ theme }) => theme.colors.DefaultText};

      input {
        margin: 0px;
      }
    }

    .add-music {
      position: absolute;
      right: 0px;
    }
  }

  .header-bottom {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

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
        height: 35px;
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
    padding: 40px 20px 0px;
    .header-top {
      & > h1 {
        span {
          display: none;
        }

        svg {
          width: 35px;
          height: 35px;
        }
      }

      .search {
        gap: 0px 5px;
        input {
          width: 125px;
          font-size: 10px;
        }

        select {
          font-size: 10px;
          width: 75px;
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

    .header-bottom {
      position: relative;
      z-index: 100;
    }
    .auth-btn-container {
      right: 0px;
      bottom: -65px;
      position: absolute;
    }
  }

  @media screen and (max-width: 485px) {
    .header-top {
      justify-content: flex-end;
      align-items: flex-end;

      .search {
        right: 0px;

        select {
          padding-left: 2.5px;
          width: 60px;
        }
      }

      .add-music {
        bottom: -55px;
      }
    }

    .header-bottom {
      justify-content: center;
      margin-top: 40px;
    }

    .auth-btn-container {
      bottom: -45px;
    }
  }
`;

export const SimplePrpfileContainer = styled.div`
  position: absolute;
  bottom: -80px;
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;

  .auth-profile {
    display: flex;
    gap: 0px 15px;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    span {
      font-size: 12px;
    }
  }

  .my-counts {
    position: absolute;
    right: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0px 15px;

    .count {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px 0px;

      svg {
        width: 15px;
        height: 15px;
      }

      span {
        font-size: 10px;
      }
    }

    .my-registered-count {
      svg {
        path {
          fill: #62e4ccff;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    height: 115px;
    bottom: -115px;
    padding: 20px 20px 0px;

    .my-counts {
      right: 20px;
    }
  }
`;
