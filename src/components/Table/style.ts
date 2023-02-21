import styled from "styled-components";
export const TabelContainer = styled.table`
  width: 550px;
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
    max-height: 710px;
    min-height: 700px;

    tr {
      height: 70px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.DefaultText};

      td {
        color: ${({ theme }) => theme.colors.DefaultText};
        text-align: center;
        overflow: hidden;
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
`;
