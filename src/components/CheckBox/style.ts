import styled from "styled-components";

export const CheckBoxContainer = styled.div`
  width: 20px;
  height: 20px;

  label {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.DefaultText};
    border-radius: 3px;

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.HoverText};
    }
  }

  .disabled-label {
    cursor: not-allowed;
    opacity: 0.32;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + .label {
    background-image: url("/svg/checked.svg");
    border: none;

    &:hover {
      border: none;
    }
  }
`;
