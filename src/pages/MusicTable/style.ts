import styled from "styled-components";

export const MusicTableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.BlackColor};
  height: 100%;
  padding: 100px 0px;
  position: relative;

  .my-info-submit {
    position: absolute;
    top: 30px;
    right: 40px;
  }

  .tabel-container {
    width: 100%;
    height: 100%;

    div {
      width: 100%;
      &:nth-child(2) {
        bottom: 30px;
      }
    }

    .table-header-btn {
      display: none;
    }
    table {
      width: 100%;
      height: 100%;
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

            svg {
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    .tabel-container {
      & > div {
        padding: 0pc;
      }

      .table-header-btn {
        display: none;
      }
      table {
        width: 100%;
        height: 100%;

        tbody {
          padding-bottom: 90px;
          max-height: 100%;
          min-height: 100%;
        }
      }
      .label-all {
        opacity: 1;
      }
      .disabled-label-all {
        opacity: 0.32;
        label {
          cursor: not-allowed;
        }
      }
      thead,
      tbody {
        tr {
          th,
          td {
            font-size: 12px;
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
              width: 120px;
            }

            &:nth-child(5) {
              width: 50px;
            }

            &:nth-child(6) {
              width: 45px;
            }
            &:nth-child(7) {
              width: 40px;
              svg {
                width: 10px;
              }
            }
            &:nth-child(8) {
              width: 40px;

              svg {
                width: 10px;
              }
            }
            &:nth-child(9) {
              display: none;
            }
            &:nth-child(10) {
              display: none;
            }
            &:nth-child(11) {
              display: none;
            }
          }
        }
      }
    }
  }
`;
