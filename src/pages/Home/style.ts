import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0 100px;
  justify-content: space-between;
  position: relative;
  padding: 0px 50px;
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

    .tabel-container {
      width: 100%;

      table {
        width: 100%;
      }
    }
  }
`;
