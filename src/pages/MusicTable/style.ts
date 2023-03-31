import styled from "styled-components";

export const MusicTableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.BlackColor};
  height: 100%;
  padding: 200px 0px;
  position: relative;
  .my-info-submit {
    position: absolute;
    top: 110px;
    right: 40px;
  }

  .tabel-container {
    width: 100%;
    height: 100%;

    div {
      width: 100%;
      &:nth-child(2) {
        bottom: -60px;
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
          margin: 0px 5px;
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
            width: 100px;
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
            width: 150px;
          }
        }
      }
    }

    tbody {
      min-height: 100%;
      max-height: 100%;
    }
  }

  @media screen and (max-width: 1660px) {
    .tabel-container {
      & > div {
        padding: 0px;
      }

      table {
        tbody {
          padding-bottom: 0px;
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
          }
        }
      }
    }
  }

  @media screen and (max-width: 950px) {
    thead,
    tbody {
      tr {
        height: 65px;
        th,
        td {
          &:first-child {
            div {
              label {
                width: 15px;
                height: 15px;
              }

              input[type="checkbox"]:checked + .label {
                background-image: url("/svg/min-checked.svg");
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.BlackColor};
    height: 100%;
    padding: 200px 0px;
    position: relative;

    .my-info-submit {
      position: absolute;
      top: 135px;
      right: 20px;
    }

    .tabel-container {
      thead,
      tbody {
        tr {
          th,
          td {
            font-size: 10px;

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
              display: none;
              width: 100px;
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
              width: 150px;
            }
          }
        }
      }

      div {
        &:last-child {
          button {
            width: 25px;
            height: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 485px) {
    .tabel-container {
      thead,
      tbody {
        tr {
          th,
          td {
            font-size: 10px;

            &:nth-child(2) {
              width: 40px;
            }

            &:nth-child(3) {
              display: none;
            }

            &:nth-child(6) {
              display: none;
            }
          }
        }
      }

      div {
        &:last-child {
          button {
            width: 25px;
            height: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
`;
