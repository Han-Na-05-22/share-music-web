import styled from "styled-components";

export const BasicSelectContainer = styled.select`
  width: 125px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.DefaultText};
  background: ${({ theme }) => theme.colors.BgColor};
  font-size: 14px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.HoverColor};
  }
  @media screen and (max-width: 1660px) {
    height: 35px;
    width: 100px;
  }
`;
