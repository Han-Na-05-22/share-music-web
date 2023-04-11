import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.ModalColor};
  width: 450px;
  height: 400px;

  input {
    background: ${({ theme }) => theme.colors.ModalColor} !important;
    color: ${({ theme }) => theme.colors.LightText};
  }

  .close-btn {
    position: absolute;
    top: -25px;
    right: 15px;
  }

  @media screen and (max-width: 1660px) {
    padding: 40px 20px 20px;
    height: 300px;
    width: 300px;
    input {
      font-size: 12px;
    }
    label {
      font-size: 11.5px;
    }
    button {
    }
  }
`;
