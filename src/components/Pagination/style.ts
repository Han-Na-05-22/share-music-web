import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  transform: translateX(-50%);
  left: 50%;

  .btn-num-group {
    display: flex;
    gap: 0px 10px;

    .btn-num-active {
      background: ${({ theme }) => theme.colors.ActiveColor};
    }
  }

  .left,
  .right {
    border: none;
  }

  .left {
    margin-right: 10px;
  }

  .right {
    margin-left: 10px;
  }
`;
