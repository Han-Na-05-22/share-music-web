import styled from "styled-components";

export const BasicSelectContainer = styled.select`
  width: 150px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.DisabledColor};
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.DefaultText};

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.HoverColor};
  }
`;
