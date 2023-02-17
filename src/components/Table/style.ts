import styled from "styled-components";
export const TabelContainer = styled.table`
  width: 500px;
  max-height: 700px;
  border: 2px solid red;
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
      }
    }
  }

  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
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
      }
    }
  }
`;
