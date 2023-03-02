import styled from "styled-components";

export const MainContainer = styled.main`
  border: 2px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 160px;

  .left {
    height: 100%;
    display: flex;
    gap: 140px 0px;
    justify-content: center;
    flex-direction: column;
  }
`;
