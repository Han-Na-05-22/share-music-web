import styled from "styled-components";

export const UserInfoContainer = styled.div`
  height: 890px;
  width: 550px;
  min-width: 550px;
  padding: 100px 40px;
  position: relative;
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

  @media screen and (max-width: 1660px) {
    width: 100%;
    min-width: 100%;
    height: 100%;

    .my-info-edit {
      gap: 25px 0px;

      .input-container {
        width: 485px;

        @media screen and (max-width: 600px) {
          width: 250px;
        }
      }

      label {
        font-size: 12px;
      }

      input {
        width: 270px;
        font-size: 12px;
      }

      .my-img {
        div {
          label {
            svg {
              transform: translate(0);
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .my-info-submit {
        width: 85px;
        min-height: 30px;
      }
    }
  }
`;
