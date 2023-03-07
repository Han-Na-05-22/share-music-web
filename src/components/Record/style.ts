import styled from "styled-components";
import { RecordStyleProps } from "./interface";

export const RecordContainer = styled.div<RecordStyleProps>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
  img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }

  .about-music {
    color: ${({ theme }) => theme.colors.BlackColor};

    strong,
    span,
    p {
      color: inherit;
    }
  }

  .rhap_container {
    border: 3px solid red;
    width: 50%;
    height: 150px;
    .rhap_main.rhap_stacked {
      .rhap_controls-section {
        border: 2px solid blue;

        .rhap_additional-controls {
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          color: ${({ theme }) => theme.colors.BlackColor};
          background: ${({ theme }) => theme.colors.BlackColor};
        }
        .rhap_main-controls {
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};

          button {
            background: ${({ theme }) => theme.colors.BlackColor};
          }
        }
        .rhap_volume-controls {
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          background: ${({ theme }) => theme.colors.BlackColor};
        }
      }
    }
  }
`;
