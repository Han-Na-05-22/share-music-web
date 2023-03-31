import styled from "styled-components";

export const UserInfoContainer = styled.div`
  width: 600px;
  min-width: 600px;
  padding: 85px 40px;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  .my-info-edit {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .input-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin: 30px 0px;
      gap: 20px 0px;

      & > div {
        width: 100%;

        &:last-child {
          input {
            margin-bottom: 0px;
          }
        }
      }
      input {
        width: 100%;
        margin: 10px 0px 20px;
      }

      label {
        color: ${({ theme }) => theme.colors.DefaultText};
      }
    }

    .my-img {
    }

    .mine {
      gap: 0px 20px;
      display: flex;
    }

    .my-info-submit {
    }
  }
`;
