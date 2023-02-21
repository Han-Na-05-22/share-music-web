import styled from "styled-components";
export const TabelContainer = styled.table`
  width: 500px;
  max-height: 700px;
  border-collapse: collapse;
  table-layout: fixed;
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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
          width: 150px;
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
    height: 560px;
    overflow-y: auto;
    display: inline-block;
    position: relative;

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
          width: 150px;
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
