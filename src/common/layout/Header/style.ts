import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h1 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;

    span {
      position: relative;
      z-index: 2;
      vertical-align: bottom;
      font-family: "Orbitron";
      text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);

      &:first-child {
        margin-right: -20px;
      }

      &:last-child {
        margin-left: -20px;
      }
    }
  }
`;
