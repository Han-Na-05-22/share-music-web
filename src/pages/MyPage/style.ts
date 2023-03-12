import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  .tabel-container {
    padding: 0px 20px;
    background: ${({ theme }) => theme.colors.ModalColor};

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    div {
      &:nth-child(2) {
        bottom: 40px;
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

  /* @media screen and (max-width: 1660px) {
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
  } */
`;
