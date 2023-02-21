import styled, { css } from "styled-components";
import { ImgUploadStyleProps } from "./interface";

export const ImgUploadContainer = styled.div<ImgUploadStyleProps>`
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
`;
