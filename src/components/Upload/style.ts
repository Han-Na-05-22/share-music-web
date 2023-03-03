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
`;
