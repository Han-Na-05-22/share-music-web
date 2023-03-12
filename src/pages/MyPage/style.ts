import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  .my-info-container {
    height: 100%;
    width: 550px;
    min-width: 550px;
    padding: 80px 20px;
    position: relative;
    background: ${({ theme }) => theme.colors.ModalColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .my-info-btn {
      position: absolute;
      left: 15px;
      top: -20px;
      z-index: 1000;
    }

    .my-info-edit {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .my-img {
      }

      .mine {
        gap: 0px 20px;
        display: flex;
      }

      .my-info-submit {
        border: 2px solid red;
      }
    }
  }

  .tabel-container {
    background: ${({ theme }) => theme.colors.ModalColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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
    .my-info-container {
      width: 30%;
      min-width: 30%;
    }

    .tabel-container {
      width: 30%;

      button {
      }
      table {
        width: 100%;
      }
    }
  }
`;
