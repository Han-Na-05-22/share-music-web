import styled, { css } from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  gap: 0px 75px;
  font-family: "Orbitron";
  letter-spacing: 1px;

  div {
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    gap: 0px 10px;
    padding: 25px 0px;

    span {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.ButtonText};
      opacity: 0.8;
      transition: 0.3s;

      &:hover {
        font-weight: bold;
        opacity: 1;
      }
    }

    svg {
      width: 30px;
      height: 30px;
      color: ${({ theme }) => theme.colors.ButtonText};
      path {
        fill: ${({ theme }) => theme.colors.ButtonText};
      }
    }
  }

  .active-nav {
    border-bottom: 3px solid ${({ theme }) => theme.colors.ButtonText};

    span {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1660px) {
    gap: 0px 35px;
    div {
      span {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 950px) {
    gap: 0px 20px;
    div {
      span {
        font-size: 12px;
      }
    }
  }
`;
