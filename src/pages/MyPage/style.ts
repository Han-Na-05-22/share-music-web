import styled from "styled-components";

export const MyPageContainer = styled.div`
  border: 2px solid red;
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  .my-info-container {
    height: 100%;
    width: 550px;
    min-width: 550px;
    padding: 80px 20px;
    position: relative;
    border: 2px solid red;

    .my-info-btn {
      position: absolute;
      left: 15px;
      top: -20px;
      z-index: 1000;
    }

    .my-info-edit {
      width: 100%;
      height: 100%;
      position: relative;
      border: 2px solid blue;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .my-img {
      }

      .mine {
        gap: 0px 20px;
        display: flex;
      }

      .my-info-submit {
        border: 2px solid red;
      }
    }
  }
`;
