import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px 0px;
  margin-bottom: 40px;
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
      align-items: flex-end;
      cursor: pointer;
      position: absolute;
      transform: translateY(-50%);
      left: 0px;
      top: 50%;

      svg {
        width: 50px;
        height: 50px;
      }
    }

    .search {
      display: flex;
      gap: 0px 25px;
      justify-content: space-around;
      align-items: center;
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

    .auth-content {
      display: flex;
      gap: 0px 35px;
      position: absolute;
      right: 0px;
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
