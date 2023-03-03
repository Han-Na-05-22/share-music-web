import styled, { css } from "styled-components";
import { ProfileImgStyleProps } from "./interface";

export const ProfileImgContainer = styled.div<ProfileImgStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  position: relative;
  z-index: 7;
  cursor: pointer;

  input {
    display: none;
  }

  .file-upload {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    cursor: pointer;
    z-index: 6;

    svg {
      border: none;
      border-radius: 100px;
      color: #000;

      path {
        stroke: ${({ theme }) => theme.colors.HoverText};
      }
    }
  }

  .file-change {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    cursor: pointer;
    z-index: 6;

    &::before {
      content: "+";
      font-family: "Pretendard";
      font-weight: 500;
      font-size: 20px;
      color: ${({ theme }) => theme.colors.HoverText};
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    svg {
      position: absolute;
      top: 41%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .delete-icon {
    top: 5px;
    right: 5px;
    position: absolute;
    z-index: 10000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 6;
    border-radius: 100px;
    &:hover {
      z-index: 5;
    }
  }

  &:hover {
    label {
      z-index: 7;
    }

    img {
      opacity: 0.5;
    }
  }
  p {
    display: none;
  }
  ${(props) =>
    props.isError &&
    css`
      p {
        font-size: 10px;
        position: absolute;
        bottom: -20px;
        left: 5px;
        width: 100%;
        display: block;
        color: ${({ theme }) => theme.colors.DefaultRed};
      }
    `}
`;
