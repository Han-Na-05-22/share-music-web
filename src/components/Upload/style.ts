import { UploadStyleProps } from "./interface";
import styled from "styled-components";

export const UploadContainer = styled.div<UploadStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: #000;
  position: relative;

  padding-top: 28px;

  span {
    position: absolute;
    top: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.DefaultText};
  }

  .file-upload {
    width: 150px;
    height: 50px;
    cursor: pointer;
    display: block;
    position: absolute;
    right: 0;
    font-size: 20px;
    letter-spacing: 0.5px;
    top: calc(50% + 10px);
    transform: translateY(-55%);
    z-index: 1000;
    text-align: center;
    line-height: 50px;
    background: ${({ theme }) => theme.colors.DefaultColor};
  }

  input {
    display: none;
  }

  p {
    padding: 0px 10px;
    top: 30px;
    width: 600px;
    height: 50px;
    overflow: hidden;
    position: absolute;
    color: ${({ theme }) => theme.colors.HoverText};
    border: 2px solid ${({ theme }) => theme.colors.DefaultColor};
    line-height: 50px;
  }
`;
