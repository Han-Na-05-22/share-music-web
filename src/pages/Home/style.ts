import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  .input-test {
    display: flex;
    align-items: center;
  }

  .left {
    border: 1px solid red;
  }

  .right {
    border: 1px solid red;
  }

  .tabel-container {
    background: ${({ theme }) => theme.colors.ModalColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 550px;
    padding-bottom: 20px;
    position: relative;
  }
`;
