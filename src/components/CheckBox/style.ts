import styled from "styled-components";

export const CheckBoxContainer = styled.div`
  width: 15px;
  height: 15px;

  label {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.DefaultText};
    border-radius: 3px;

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.HoverText};
    }
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + label {
    background-image: url("/svg/checked.svg");
    border: none;

    &:hover {
      border: none;
    }
  }
`;
