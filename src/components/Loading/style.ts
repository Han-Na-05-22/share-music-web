import styled from "styled-components";
export const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 0px 35px;
  background: #fff;
  z-index: 1000;

  .box {
    width: 35px;
    height: 35px;
    background: ${({ theme }) => theme.colors.DefaultColor};
    border-radius: 100px;
    animation-name: loadingAni;
    animation-fill-mode: both;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .box-1 {
    animation-delay: 0s;
  }
  .box-2 {
    animation-delay: 0.7s;
  }
  .box-3 {
    animation-delay: 1.4s;
  }

  @keyframes loadingAni {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;
