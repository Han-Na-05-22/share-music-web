import styled from "styled-components";
import { RecordStyleProps } from "./interface";

export const RecordContainer = styled.div<RecordStyleProps>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 70px 100px 0px;

  .add-date {
    position: absolute;
    top: 15px;
    right: 15px;
    color: ${({ theme }) => theme.colors.LightText};
    font-size: 14px;
  }

  .about-music,
  .about-music-artists,
  .like-download {
    color: ${({ theme }) => theme.colors.LightText};

    strong,
    span,
    p,
    b {
      color: inherit;
    }
  }

  .about-music {
    width: 100%;
  }

  .about-music.top {
    width: 100%;
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0px;

    b {
      margin: 0px 5px;
    }
  }

  .about-music-artists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .like-download-counts {
      display: flex;
      flex-direction: column;
      gap: 10px 0px;
      align-items: center;
      justify-content: center;
      margin-top: 15px;

      .like-download {
        display: flex;
        gap: 0px 25px;
        align-items: center;
        justify-content: center;

        svg {
          cursor: pointer;
        }
      }
    }
  }

  .about-music.bottom {
    width: 100%;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    p {
      padding: 10px 0px 0px 10px;
      margin-top: 10px;
      width: 100%;
      min-height: 100px;
      border: 1px solid ${({ theme }) => theme.colors.DefaultText};
      @media screen and (max-width: 1660px) {
        min-height: 50px;
      }
    }
  }

  .rhap_container {
    padding: 0px;
    width: 100%;
    box-shadow: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.DefaultText};
    .rhap_main.rhap_stacked {
      .rhap_progress-section {
        flex: none;

        .rhap_time {
          color: ${({ theme }) => theme.colors.LightText};
        }
        .rhap_current-time {
        }

        .rhap_progress-container {
          .rhap_progress-bar {
            .rhap_download-progress {
              background: ${({ theme }) => theme.colors.DisabledColor};
            }

            .rhap_progress-indicator,
            .rhap_progress-filled {
              background: ${({ theme }) => theme.colors.DefaultColor};
            }
          }
        }
      }
      .rhap_controls-section {
        flex: none;
        margin: 15px 0px;
        .rhap_additional-controls {
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          color: ${({ theme }) => theme.colors.DefaultColor};
          border: none;
          background: ${({ theme }) => theme.colors.ModalColor};

          button {
            svg {
              path {
                fill: ${({ theme }) => theme.colors.DefaultColor};
              }
            }
          }
        }
        .rhap_main-controls {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          border: none;
          button {
            background: ${({ theme }) => theme.colors.ModalColor};

            svg {
              path {
                fill: ${({ theme }) => theme.colors.DefaultColor};
              }
            }
          }
        }
        .rhap_volume-controls {
          width: 100px;
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          border: none;
          background: ${({ theme }) => theme.colors.ModalColor};
          button {
            svg {
              path {
                fill: ${({ theme }) => theme.colors.DefaultColor};
              }
            }
          }

          .rhap_volume-bar-area {
            .rhap_volume-bar {
              background: ${({ theme }) => theme.colors.DefaultColor};

              .rhap_volume-indicator {
                background: ${({ theme }) => theme.colors.DefaultColor};
              }
            }
          }
        }
      }
    }
  }
`;
