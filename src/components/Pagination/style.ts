import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  transform: translateX(-50%);
  left: 50%;
  bottom: 45px;
  margin-top: 20px;

  button {
    border: none;
  }

  .btn-num-active {
    background: ${({ theme }) => theme.colors.ActiveColor};
  }
`;
