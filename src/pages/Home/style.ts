import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  height: 100%;

  .popular-slider {
  }

  section {
    padding: 25px 40px;
    width: 100%;
    overflow: hidden;
    &:nth-child(1) {
      background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
    }

    h3 {
      padding: 20px 0px;
      width: 5%;
      border-bottom: 2px solid #ccc;
      position: relative;
      font-weight: bold;
    }

    .slick-slider {
      overflow: visible;

      .slick-list {
        width: 2624px;
        transition-timing-function: linear;

        .slick-slide {
          width: 250px;
          border-radius: 10px;
          opacity: 0.8;
          transition: 0.3s;
          padding: 60px 0px 40px;
          &:hover {
            transform: translateY(-15px);
            opacity: 1;
            cursor: pointer;
          }

          .test {
            width: 175px;
            height: 175px;
            left: 50%;
            transform: translateX(-50%);
            position: relative;
            &::before {
              display: block;
              content: "";
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              filter: blur(20px);
              background-image: linear-gradient(
                to top,
                #7028e4 0%,
                #e5b2ca 100%
              );
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
              position: relative;
            }

            .circle {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 50px;
              height: 50px;
              z-index: 10;
              background: #fff;
              border-radius: 100px;
            }
          }

          div {
            font-size: 16px;
            color: #fff;
            text-align: center;
            margin-bottom: 15px;
          }

          .singer {
            color: #ccc;
            font-size: 14px;
          }
        }
      }
    }
  }

  .new-slider,
  .popular-slider {
    .slick-slider {
      overflow: visible;
      padding: 60px 0px 0px;
      .slick-list {
        height: 300px;
        transition-timing-function: linear;
        width: 100%;
        .slick-slide {
          width: 250px;
          height: 100%;
          padding: 25px;
          border-radius: 10px;
          opacity: 0.8;
          transition: 0.3s;
          margin: 0px 100px;
          background: #1b1b1bff;

          &:hover {
            transform: translateY(-15px);
            opacity: 1;
            cursor: pointer;
          }

          .test {
            width: 150px;
            height: 150px;
            left: 50%;
            transform: translateX(-50%);
            position: relative;
            &::before {
              display: none;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
              position: relative;
            }

            .circle {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 50px;
              height: 50px;
              z-index: 10;
              background: #fff;
              border-radius: 100px;
            }
          }

          div {
            font-size: 16px;
            color: #fff;
            text-align: center;
            margin-bottom: 15px;
          }

          .singer {
            color: #ccc;
            font-size: 14px;
          }
        }
      }
    }
  }
  .artist-slider {
    width: 100%;
    display: flex;
    padding: 100px 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .tabel-container {
      width: 40%;
      position: relative;
      padding-top: 50px;
      h4 {
        top: -25px;
        position: absolute;
      }

      & > div {
        border-radius: 10px;
        width: 100%;
        padding: 20px 40px 40px;
        background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
        table {
          width: 100%;

          thead,
          tbody {
          }
          tbody {
            max-height: 100%;
            min-height: 500px;
          }
        }
      }
    }
  }
`;
