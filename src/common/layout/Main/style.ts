import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 840px;
    gap: 40px 0px;
  }

  .my-profile {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 50px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    color: ${({ theme }) => theme.colors.HoverText};

    p {
      color: inherit;
      font-size: 22px;
    }

    ul {
      width: 100%;
      padding: 20px;
      gap: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        width: 60%;
        justify-content: space-between;

        span {
          font-size: 20px;
          color: ${({ theme }) => theme.colors.HoverText};
        }
      }
    }

    strong {
      position: absolute;
      bottom: 15px;
      right: 15px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.DefaultText};
    }
  }
`;
