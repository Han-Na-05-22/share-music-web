import styled from "styled-components";

export const OverlayContainer = styled.div`
  border: 2px solid red;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
`;
