import styled from "styled-components";

export const TableGroupContainer = styled.div`
  position: relative;
  /* background: ${({ theme }) => theme.colors.ModalColor}; */
  /* background: #2f026bff; */
  /* background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%); */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 15px 20px;
  width: 600px;

  @media screen and (max-width: 1660px) {
    width: 100%;
    min-height: 500px;
    .table-header-btn {
      left: 0px !important;
    }
  }
  .table-header-btn {
    position: absolute;
    left: 15px;
    top: -50px;
  }
`;
export const TabelContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead {
    height: 70px;
    width: 100%;
    display: flex;
    border-bottom: 2px solid ${({ theme }) => theme.colors.DefaultText};

    tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: ${({ theme }) => theme.colors.HoverText};
      padding: 0px 15px;
      th {
        color: inherit;
        font-weight: bold;

        &:first-child {
          width: 35px;
        }

        &:nth-child(2) {
          width: 40px;
        }

        &:nth-child(3) {
          width: 175px;
        }

        &:nth-child(4) {
          width: 75px;
        }

        &:nth-child(5) {
          width: 50px;
        }

        &:nth-child(6) {
          width: 50px;
        }
      }
    }
  }

  tbody {
    width: 100%;
    overflow-y: auto;
    display: inline-block;
    position: relative;
    max-height: 725px;
    min-height: 725px;

    tr {
      height: 65px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.DefaultText};

      &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.colors.TableHoverColor};
        td {
          color: ${({ theme }) => theme.colors.HoverText};
        }
      }

      td {
        color: ${({ theme }) => theme.colors.DefaultText};
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        img {
          width: 45px;
          height: 45px;
        }

        &:first-child {
          width: 35px;
        }

        &:nth-child(2) {
          width: 40px;
        }

        &:nth-child(3) {
          width: 175px;
        }

        &:nth-child(4) {
          width: 75px;
        }

        &:nth-child(5) {
          width: 50px;
        }

        &:nth-child(6) {
          width: 50px;
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    width: 100%;

    thead {
      tr {
        padding: 0px 10px;
        th {
          color: inherit;
          font-weight: bold;
          font-size: 12px;
        }
        th {
          &:first-child {
            width: 25px;
          }

          &:nth-child(2) {
            width: 40px;
          }

          &:nth-child(3) {
            width: 100px;
          }

          &:nth-child(4) {
            width: 50px;
          }

          &:nth-child(5) {
            width: 40px;
          }

          &:nth-child(6) {
            width: 40px;
          }
        }
      }
    }

    tbody {
      max-height: 100%;
      min-height: 100%;
      padding-bottom: 60px;

      tr {
        padding: 0px 10px;

        td {
          &:first-child {
            width: 25px;
          }

          &:nth-child(2) {
            width: 40px;
          }

          &:nth-child(3) {
            width: 100px;
          }

          &:nth-child(4) {
            width: 50px;
          }

          &:nth-child(5) {
            width: 40px;
          }

          &:nth-child(6) {
            width: 40px;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
`;
