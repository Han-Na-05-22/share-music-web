import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  gap: 0 100px;
  position: relative;

  .input-test {
    display: flex;
    align-items: center;
  }

  .left {
  }

  .right {
  }

  .tabel-container {
    background: ${({ theme }) => theme.colors.ModalColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 550px;
    padding-bottom: 20px;
    position: relative;
  }

  @media screen and (max-width: 1660px) {
    flex-direction: column;
    gap: 50px 0px;
    padding-bottom: 40px;
    .left-container {
      .left {
        width: 100%;
        section {
          width: 100%;
        }

        & > div {
          width: 100%;
        }
      }
    }

    .tabel-container {
      width: 100%;

      button {
        left: 50%;
        transform: translateX(-50%);
        top: 0px;
      }
      table {
        width: 100%;
      }
    }
  }
`;
