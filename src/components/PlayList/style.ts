import styled from "styled-components";
// todo : 중복도ㅣ는 스타일 삭제해야함
export const PlayListContainer = styled.div`
  .no-data {
    width: 100%;
    text-align: center;
  }

  .play-list-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10000;
  }

  & > div {
    width: 100%;
    height: 100px;
    position: fixed;
    left: 0%;
    bottom: 0%;
    background: ${({ theme }) => theme.colors.BgColor};
    padding: 0px 40px;
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;

    .paly-list-container {
      max-width: 1000px;
      min-width: 600px;
      padding-left: 7%;
      height: 100%;
      display: flex !important;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      gap: 0px 20px;

      .about-genre {
        display: none;
      }

      .counts {
        display: none;
      }

      .ani {
        width: 50px;
        height: 50px;
        border-radius: 100px;
        position: relative;

        img {
          width: 100%;
          border-radius: 50%;
          height: 100%;
        }
      }

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

      .about-music {
        display: flex;
        gap: 10px 0px;
        text-align: center;

        p {
          display: none;
        }

        span {
          margin: 0px 5px;
        }
      }

      strong,
      p,
      span {
        color: ${({ theme }) => theme.colors.ButtonText};
      }
    }

    .rhap_container {
      padding: 0px;
      width: 100%;
      box-shadow: none;
      background: none;
      .rhap_main.rhap_stacked {
        flex-direction: row;
        display: flex;
        padding-left: 30%;

        .rhap_progress-section {
          flex: none;
          width: 50%;

          .rhap_time {
            color: ${({ theme }) => theme.colors.ButtonText};
          }
          .rhap_current-time {
          }

          .rhap_progress-container {
            .rhap_progress-bar {
              .rhap_download-progress {
              }

              .rhap_progress-indicator,
              .rhap_progress-filled {
              }
            }
          }
        }
        .rhap_controls-section {
          flex: none;
          background: none;
          margin: 15px 0px;
          width: 30%;
          padding-left: 5%;
          .rhap_additional-controls {
            border: 1px solid ${({ theme }) => theme.colors.ButtonText};
            color: ${({ theme }) => theme.colors.DefaultColor};
            border: none;

            button {
              svg {
                path {
                  fill: ${({ theme }) => theme.colors.ButtonText};
                }
              }
            }
          }
          .rhap_main-controls {
            border: 1px solid ${({ theme }) => theme.colors.ButtonText};
            border: none;
            position: absolute;
            left: 40%;

            button {
              svg {
                path {
                  fill: ${({ theme }) => theme.colors.ButtonText};
                }
              }
            }
          }
          .rhap_volume-controls {
            border: 1px solid ${({ theme }) => theme.colors.ButtonText};
            border: none;
            width: 100%;

            button {
              svg {
                path {
                  fill: ${({ theme }) => theme.colors.ButtonText};
                }
              }
            }

            .rhap_volume-bar-area {
              width: 150px;
              .rhap_volume-bar {
                .rhap_volume-indicator {
                  background: ${({ theme }) => theme.colors.ButtonText};
                }
              }
            }
          }
        }
      }
    }
  }

  .detail-play-list {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    background: ${({ theme }) => theme.colors.BgColor};
    flex-direction: column;
    justify-content: space-evenly;
    padding: 100px 20px 100px;

    .paly-list-container {
      width: 100%;
      flex-direction: column;
      gap: 50px 0px;
      cursor: default;

      .about-genre {
        display: block;
        font-size: 20px;
      }
      .counts {
        display: block;
      }

      .img-ani.ani,
      .img-ani-paused.ani {
        width: 150px;
        height: 150px;
        background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);
      }

      .img-ani {
        &::before {
          content: "";
          position: absolute;
          top: 0px;
          left: 0px;
          width: 110%;
          height: 110%;
          border-radius: 50%;
          filter: blur(20px);
          background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);
          animation: rotate 3s linear infinite;
          animation-play-state: running;
        }

        img {
          animation: rotate 5s linear infinite;
          animation-play-state: running;
        }
      }

      .img-ani-paused {
        &::before {
          animation-play-state: paused;
        }
        img {
          animation-play-state: paused;
        }
      }

      .about-music {
        flex-direction: column;
        gap: 30px 0px;
        width: 100%;
        align-items: center;
        strong,
        p,
        span {
          font-size: 20px;
          color: #ccc;
        }

        .title {
          font-size: 24px;
          color: ${({ theme }) => theme.colors.DefaultText};
          font-weight: bold;
        }

        .counts {
          display: flex;
          flex-direction: column;
          gap: 20px 0px;
          justify-content: center;

          li {
            display: flex;
            gap: 0px 15px;
            justify-content: center;

            svg {
              width: 25px;
              height: 25px;
              opacity: 1;
            }
          }
        }

        .explanation {
          padding: 10px;
          max-width: 550px;
          width: 100%;
          display: inline-block;
          min-height: 100px;
          line-height: 1.5;
          font-size: 18px;
          text-align: left;
          border: 2px solid rgba(255, 255, 255, 0.5);

          @media screen and (max-width: 600px) {
            max-width: 300px;
          }
        }
      }
    }

    .rhap_container {
      .rhap_main.rhap_stacked {
        flex-direction: column;
        padding: 0px;
        .rhap_progress-section {
          width: 100%;
          padding: 0px;
          .rhap_current-time {
          }

          .rhap_progress-container {
            .rhap_progress-bar {
              .rhap_download-progress {
              }

              .rhap_progress-indicator,
              .rhap_progress-filled {
              }
            }
          }
        }
        .rhap_controls-section {
          flex: none;
          width: 100%;
          padding-left: 0px;
          .rhap_additional-controls {
            button {
              svg {
                path {
                }
              }
            }
          }
          .rhap_main-controls {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            button {
              svg {
                path {
                }
              }
            }
          }
          .rhap_volume-controls {
            min-width: 100px;
            width: 100px;
            max-width: 100px;
            button {
              svg {
                path {
                }
              }
            }

            .rhap_volume-bar-area {
              width: 75px;
              .rhap_volume-bar {
                width: 75px;
                .rhap_volume-indicator {
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    & > div {
      .paly-list-container {
        max-width: 35%;
        min-width: 35%;
        padding: 0px 30px 0px 50px;

        .ani {
          width: 35px;
          height: 35px;
          img {
            width: 35px;
            height: 35px;
          }
        }

        .prev-btn {
          width: 20px;
        }
        .next-btn {
          width: 20px;
        }
      }

      .rhap_container {
        .rhap_main.rhap_stacked {
          padding: 0px 15px 0px 175px;

          .rhap_progress-section {
            .rhap_current-time {
            }

            .rhap_progress-container {
              .rhap_progress-bar {
                .rhap_download-progress {
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                }
              }
            }
          }
          .rhap_controls-section {
            width: 40%;
            padding-left: 15%;
            .rhap_additional-controls {
              button {
                display: none;
              }
            }
            .rhap_main-controls {
              left: 37.5%;
            }
            .rhap_volume-controls {
              .rhap_volume-container {
                .progressbar {
                }
              }

              .rhap_volume-bar-area {
                width: 100px;
                .rhap_volume-bar {
                  .rhap_volume-indicator {
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail-play-list {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 1000;
      background: ${({ theme }) => theme.colors.BgColor};
      flex-direction: column;
      justify-content: space-evenly;
      padding: 100px 20px 100px;

      .paly-list-container {
        width: 100%;
        flex-direction: column;
        gap: 50px 0px;
        cursor: default;

        .about-genre {
          display: block;
          font-size: 20px;
        }
        .counts {
          display: block;
        }

        .img-ani.ani,
        .img-ani-paused.ani {
          width: 150px;
          height: 150px;
          background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);

          img {
            width: 100%;
            height: 100%;
          }
        }

        .img-ani {
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            filter: blur(20px);
            background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);
            animation: rotate 3s linear infinite;
            animation-play-state: running;
          }

          img {
            animation: rotate 5s linear infinite;
            animation-play-state: running;
          }
        }

        .img-ani-paused {
          &::before {
            animation-play-state: paused;
          }
          img {
            animation-play-state: paused;
          }
        }

        .about-music {
          flex-direction: column;
          gap: 30px 0px;
          width: 100%;
          align-items: center;
          strong,
          p,
          span {
            font-size: 20px;
            color: #ccc;
          }

          .title {
            font-size: 24px;
            color: ${({ theme }) => theme.colors.DefaultText};
            font-weight: bold;
          }

          .counts {
            display: flex;
            flex-direction: column;
            gap: 20px 0px;
            justify-content: center;

            li {
              display: flex;
              gap: 0px 15px;
              justify-content: center;

              svg {
                width: 25px;
                height: 25px;
                opacity: 1;
              }
            }
          }

          .explanation {
            padding: 10px;
            max-width: 550px;
            width: 100%;
            display: inline-block;
            min-height: 100px;
            line-height: 1.5;
            font-size: 18px;
            text-align: left;
            border: 2px solid rgba(255, 255, 255, 0.5);

            @media screen and (max-width: 600px) {
              max-width: 300px;
            }
          }
        }
      }

      .rhap_container {
        .rhap_main.rhap_stacked {
          flex-direction: column;
          padding: 0px;
          .rhap_progress-section {
            width: 100%;
            padding: 0px;
            .rhap_current-time {
            }

            .rhap_progress-container {
              .rhap_progress-bar {
                .rhap_download-progress {
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                }
              }
            }
          }
          .rhap_controls-section {
            flex: none;
            width: 100%;
            padding-left: 0px;
            .rhap_additional-controls {
              button {
                svg {
                  path {
                  }
                }
              }
            }
            .rhap_main-controls {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              button {
                svg {
                  path {
                  }
                }
              }
            }
            .rhap_volume-controls {
              min-width: 100px;
              width: 100px;
              max-width: 100px;
              button {
                svg {
                  path {
                  }
                }
              }

              .rhap_volume-bar-area {
                width: 75px;
                .rhap_volume-bar {
                  width: 75px;
                  .rhap_volume-indicator {
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 950px) {
    & > div {
      padding: 0px 0px 0px 60px;

      .paly-list-container {
        max-width: 60%;
        min-width: 60%;
        overflow: hidden;
        padding: 0px;
        .ani {
          width: 30px;
          height: 30px;
          img {
            width: 30px;
            height: 30px;
          }

          .about-music {
            /* width: 50%;
            max-width: 50%; */
          }

          strong,
          p,
          span {
            font-size: 10px;
          }
        }

        .prev-btn {
          left: 15px;
          width: 15px;
        }
        .next-btn {
          right: 15px;
          width: 15px;
        }
      }

      .rhap_container {
        .rhap_main.rhap_stacked {
          padding: 0px 15px 0px 175px;

          .rhap_progress-section {
            display: none;
            .rhap_current-time {
            }

            .rhap_progress-container {
              .rhap_progress-bar {
                .rhap_download-progress {
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                }
              }
            }
          }
          .rhap_controls-section {
            width: 20%;
            padding-left: 5%;
            .rhap_additional-controls {
              button {
                display: none;
              }
            }
            .rhap_main-controls {
              left: 70%;

              button {
                font-size: 30px;
              }
            }
            .rhap_volume-controls {
              display: none;
              width: 50px;

              .rhap_volume-container {
                .progressbar {
                }
              }

              .rhap_volume-bar-area {
                width: 50px;
                .rhap_volume-bar {
                  .rhap_volume-indicator {
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    & > div {
      padding: 0px;

      .paly-list-container {
        max-width: 100%;
        min-width: 100%;
        position: absolute;
        padding: 10px 20px 20px;
        align-items: flex-start;

        .ani {
          width: 30px;
          height: 30px;
          img {
            width: 30px;
            height: 30px;
          }
        }

        .prev-btn {
          left: 35px;
          width: 20px;
          bottom: 10px;
        }
        .next-btn {
          right: 35px;
          bottom: 10px;
          width: 20px;
        }
      }

      .rhap_container {
        .rhap_main.rhap_stacked {
          padding: 0px;

          .rhap_progress-section {
            display: none;
            .rhap_current-time {
            }

            .rhap_progress-container {
              display: none;
              .rhap_progress-bar {
                .rhap_download-progress {
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                }
              }
            }
          }
          .rhap_controls-section {
            width: 20%;
            padding-left: 5%;
            .rhap_additional-controls {
              button {
                display: none;
              }
            }
            .rhap_main-controls {
              left: 50%;
              transform: translateX(-50%);
              bottom: 0px;

              button {
                font-size: 30px;
              }

              .rhap_rewind-button,
              .rhap_forward-button {
                /* display: none; */
              }
            }
            .rhap_volume-controls {
              display: none;
              width: 50px;

              .rhap_volume-container {
                .progressbar {
                }
              }

              .rhap_volume-bar-area {
                width: 50px;
                .rhap_volume-bar {
                  .rhap_volume-indicator {
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail-play-list {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 1000;
      background: ${({ theme }) => theme.colors.BgColor};
      flex-direction: column;
      justify-content: space-evenly;
      padding: 100px 20px 100px;

      .paly-list-container {
        width: 100%;
        flex-direction: column;
        gap: 50px 0px;
        align-items: center;
        cursor: default;

        .about-genre {
          display: block;
          font-size: 20px;
        }
        .counts {
          display: block;
        }

        .img-ani.ani,
        .img-ani-paused.ani {
          width: 150px;
          height: 150px;
          background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);

          img {
            width: 100%;
            height: 100%;
          }
        }

        .img-ani {
          &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            filter: blur(20px);
            background-image: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);
            animation: rotate 3s linear infinite;
            animation-play-state: running;
          }

          img {
            animation: rotate 5s linear infinite;
            animation-play-state: running;
          }
        }

        .img-ani-paused {
          &::before {
            animation-play-state: paused;
          }
          img {
            animation-play-state: paused;
          }
        }

        .about-music {
          flex-direction: column;
          gap: 30px 0px;
          width: 100%;
          align-items: center;
          strong,
          p,
          span {
            font-size: 20px;
            color: #ccc;
          }

          .title {
            font-size: 24px;
            color: ${({ theme }) => theme.colors.DefaultText};
            font-weight: bold;
          }

          .counts {
            display: flex;
            flex-direction: column;
            gap: 20px 0px;
            justify-content: center;

            li {
              display: flex;
              gap: 0px 15px;
              justify-content: center;

              svg {
                width: 25px;
                height: 25px;
                opacity: 1;
              }
            }
          }

          .explanation {
            padding: 10px;
            max-width: 550px;
            width: 100%;
            display: inline-block;
            min-height: 100px;
            line-height: 1.5;
            font-size: 18px;
            text-align: left;
            border: 2px solid rgba(255, 255, 255, 0.5);

            @media screen and (max-width: 600px) {
              max-width: 300px;
            }
          }
        }
      }

      .rhap_container {
        .rhap_main.rhap_stacked {
          flex-direction: column;
          padding: 0px;
          .rhap_progress-section {
            width: 100%;
            padding: 0px;
            .rhap_current-time {
            }

            .rhap_progress-container {
              .rhap_progress-bar {
                .rhap_download-progress {
                }

                .rhap_progress-indicator,
                .rhap_progress-filled {
                }
              }
            }
          }
          .rhap_controls-section {
            flex: none;
            width: 100%;
            padding-left: 0px;
            .rhap_additional-controls {
              button {
                svg {
                  path {
                  }
                }
              }
            }
            .rhap_main-controls {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              button {
                svg {
                  path {
                  }
                }
              }
            }
            .rhap_volume-controls {
              min-width: 100px;
              width: 100px;
              max-width: 100px;
              button {
                svg {
                  path {
                  }
                }
              }

              .rhap_volume-bar-area {
                width: 75px;
                .rhap_volume-bar {
                  width: 75px;
                  .rhap_volume-indicator {
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
