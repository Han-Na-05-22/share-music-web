import styled from "styled-components";

export const GenreContainer = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;

  .title {
    color: ${({ theme }) => theme.colors.HoverText};
    font-size: 24px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0px 30px;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1660px) {
    width: 100%;
    height: 250px;

    .title {
      font-size: 16px;
    }

    div {
      gap: 0px 15px;

      button {
        width: 90px;
        span {
          font-size: 16px;
        }
      }
    }
  }
`;
