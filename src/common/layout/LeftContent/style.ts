import styled from "styled-components";

export const LeftContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 840px;
    gap: 40px 0px;
    position: relative;

    .my-page-btn {
      position: absolute;
      top: 25px;
      left: 15px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.DefaultText};
    }

    .my-music-btn {
      position: absolute;
      top: -25px;
      right: 15px;
      z-index: 10;
    }
  }

  .my-profile {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 50px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    color: ${({ theme }) => theme.colors.HoverText};

    p {
      color: inherit;
      font-size: 22px;
    }

    ul {
      width: 100%;
      padding: 20px;
      gap: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        width: 60%;
        justify-content: space-between;

        span {
          font-size: 20px;
          color: ${({ theme }) => theme.colors.HoverText};
        }
      }
    }

    strong {
      position: absolute;
      width: 75px;
      height: 16px;
      bottom: 15px;
      right: 15px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.DefaultText};
    }
  }

  @media screen and (max-width: 1660px) {
    .left {
      height: 325px;
      gap: 25px 0px;
    }

    .my-profile {
      padding: 30px;

      p {
        font-size: 12px;
      }

      ul {
        padding: 10px;
        gap: 15px;

        li {
          span {
            font-size: 12px;
          }
        }
      }

      strong {
        height: 16px;
        bottom: 10px;
        right: -15px;
        font-size: 12px;
      }
    }

    .file-upload {
      svg {
        position: absolute;
        top: 41%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75px;
        height: 75px;
      }
    }
  }
`;
