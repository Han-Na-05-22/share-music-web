import styled from "styled-components";

export const UserInfoContainer = styled.div`
  height: 890px;
  width: 550px;
  min-width: 550px;
  padding: 40px 20px;
  position: relative;
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .my-info-btn {
    position: absolute;
    left: 15px;
    top: -20px;
  }

  .my-info-edit {
    width: 100%;
    height: 100%;
    position: relative;
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
    }
  }

  @media screen and (max-width: 1660px) {
    width: 100%;
    min-width: 100%;
    height: 100%;
    .my-info-edit {
      gap: 25px 0px;

      .my-name-id,
      .my-phone-displayName {
        input {
          width: 125px;
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
      }

      .my-info-submit {
        width: 85px;
        min-height: 30px;
      }
    }
  }
`;
