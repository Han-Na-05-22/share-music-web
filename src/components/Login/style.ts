import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 70px 0px 50px;

  .join-btn {
    position: absolute;
    top: -25px;
    right: 15px;
  }

  @media screen and (max-width: 1660px) {
    padding: 40px 20px 20px;
    height: 300px;

    button {
    }
  }
`;
