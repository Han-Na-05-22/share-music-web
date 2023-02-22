import styled from "styled-components";
import { RecordStyleProps } from "./interface";

export const RecordContainer = styled.div<RecordStyleProps>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    .record-content {
      opacity: 0.5;
    }

    svg {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      display: block;
      opacity: 0.5;
    }
  }

  .record-content {
    width: 100%;
    height: 100%;
    border-radius: inherit;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }

  .pause {
  }

  .play {
  }

  svg {
    display: none;
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.colors.ButtonText};
    width: 75px;
    height: 75px;
    border-radius: inherit;
  }
`;
