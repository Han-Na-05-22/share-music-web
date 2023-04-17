import styled from "styled-components";
import { MusicDetailStyleProps } from "./interface";

export const MusicDetailContainer = styled.div<MusicDetailStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.ModalColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 70px;
  flex-direction: column;

  .close-btn {
    position: relative;
    z-index: 10000;
  }

  @media screen and (max-width: 1660px) {
    width: 300px;
    height: 500px;
    padding-bottom: 20px;

    & > div {
      padding: 40px 15px 0px;
      gap: 5px 0px;
      font-size: 13px;
    }

    .add-date {
      font-size: 10px !important;
    }

    .about-music {
      strong {
        text-align: center;
      }
    }
    .about-music,
    .about-music-artists,
    .like-download {
      strong,
      span,
      p,
      b {
        font-size: 10px;
      }
    }

    .about-music-artists {
      & > div {
        margin-top: 0px !important;
      }
    }

    .about-music.bottom {
      width: 100%;

      p {
        margin: 0px;
        min-height: 50px;
      }
    }

    .rhap_container {
      width: 100%;
      padding: 0px 10px;

      .rhap_main.rhap_stacked {
        .rhap_progress-section {
          .rhap_time {
            font-size: 10px;
          }
        }
        .rhap_controls-section {
          margin: 0px;
          .rhap_additional-controls {
            width: 50px;
            flex: none;
            height: 30px;
            button {
              svg {
                width: 20px;
                height: 20px;
              }
            }
          }

          .rhap_main-controls {
            width: 110px;

            button {
              svg {
                width: 30px;
                height: 30px;
              }
            }
          }
          .rhap_volume-controls {
            width: 60px;
            height: 40px;
            flex: none;

            button {
              svg {
                width: 20px;
              }
            }
          }
        }
      }
    }

    .close-btn {
      width: 75px;
    }
  }
`;
