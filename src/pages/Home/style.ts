import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0 100px;
  justify-content: space-between;
  position: relative;

  .input-test {
    display: flex;
    align-items: center;
  }

  .left {
  }

  .right {
  }

  @media screen and (max-width: 1660px) {
    flex-direction: column;
    gap: 100px 0px;
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

      table {
        width: 100%;
      }
    }
  }
`;
