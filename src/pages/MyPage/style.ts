import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  padding: 0px 0px 100px;
  .tabel-container {
    div {
      &:nth-child(2) {
        bottom: 35px;
        position: absolute;
      }
    }

    tbody {
      min-height: 800px;
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
    flex-direction: column;
    gap: 70px 0px;
    height: 100%;

    .my-info-container {
      width: 100%;
      min-width: 100%;
      min-height: 100%;
      max-height: 100%;
      height: 100%;
    }

    .tabel-container {
      position: relative;

      tbody {
        max-height: 100%;
        min-height: 100%;
      }

      div {
        &:nth-child(2) {
          bottom: 7.5px;
        }
      }

      tbody {
        min-height: 100%;
        max-height: 100%;
      }
      & > div {
        padding: 20px;
      }

      td {
        svg {
          width: 15px;
        }
      }
    }
  }
`;
