import styled, { css } from "styled-components";
import { SquareButtonStyleProps } from "./interface";

export const SquareButtonContainer = styled.button<SquareButtonStyleProps>`
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.DefaultColor};
  border: none;
  transition: 0.5s;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.HoverColor};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.DisabledColor};
    cursor: not-allowed;
  }
`;
