import styled from "styled-components";

export const MusicTableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.BlackColor};
  height: 100%;

  .music-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 40px;

    .search {
      display: flex;
      gap: 0px 25px;
      justify-content: space-around;
      align-items: center;
    }
  }

  .tabel-container {
    width: 100%;
    position: relative;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0px 40px;

    .table-header-btn {
      display: none;
    }
    table {
      width: 100%;
    }

    thead,
    tbody {
      tr {
        th,
        td {
          &:first-child {
            width: 40px;
          }

          &:nth-child(2) {
            width: 35px;
          }

          &:nth-child(3) {
            width: 75px;
          }

          &:nth-child(4) {
            width: 250px;
          }

          &:nth-child(5) {
            width: 100px;
          }

          &:nth-child(6) {
            width: 50px;
          }
          &:nth-child(7) {
            width: 50px;
          }
          &:nth-child(8) {
            width: 50px;
          }
          &:nth-child(9) {
            width: 100px;
          }
          &:nth-child(10) {
            width: 100px;
          }
          &:nth-child(11) {
            width: 50px;

            .clicked-svg {
              path {
                fill-opacity: 1;
              }
            }
          }
        }
      }
    }
  }
`;
