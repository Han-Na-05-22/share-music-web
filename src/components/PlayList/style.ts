import styled from "styled-components";

export const PlayListContainer = styled.div`
  width: 650px;
  height: 500px;
  position: absolute;
  z-index: 10000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 80px 50px 50px;

  .play-list-btn {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .paly-list-container {
    width: 100%;
    height: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px 0px;

    .btn {
      position: absolute;
      z-index: 10000;
      cursor: pointer;
    }

    .prev-btn {
      left: 30px;
    }
    .next-btn {
      right: 30px;
    }
    img {
      width: 125px;
      height: 125px;
      border-radius: 100%;
    }

    .about-music {
      display: flex;
      flex-direction: column;
      gap: 15px 0px;
    }

    strong,
    p {
      color: ${({ theme }) => theme.colors.BlackColor};
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
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          border: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
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
          border: 1px solid ${({ theme }) => theme.colors.BlackColor};
          border: none;
          width: 100px;
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

  @media screen and (max-width: 1660px) {
    width: 300px;
    height: 500px;
    padding: 40px 30px;

    .play-list-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 75px;
      height: 35px;

      span {
        font-size: 14px;
      }
    }

    .paly-list-container {
      img {
        width: 100px;
        height: 100px;
      }
    }

    .rhap_container {
      width: 250px;
      padding: 0px 10px;
      .rhap_main.rhap_stacked {
        .rhap_controls-section {
          margin: 15px 0px;
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
            width: 100px;
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
  }
`;
