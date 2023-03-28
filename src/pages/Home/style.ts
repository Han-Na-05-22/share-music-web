import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  height: 100%;

  .recommend-slider {
    padding: 90px 40px 110px;
    width: 100%;
    overflow: hidden;

    h3 {
      padding: 20px 0px;
      width: 5%;
      border-bottom: 2px solid #ccc;
      position: relative;
      font-weight: bold;
    }

    .slick-slider {
      height: 200px;

      .slick-arrow {
        width: 50px;
        height: 50px;
        top: 0px;

        &::before {
          font-size: 30px;
        }
      }

      .slick-prev {
        left: calc(100% - 80px);
      }

      .slick-next {
        left: calc(100% - 40px);
      }
      .slick-list {
        width: 2624px;

        .slick-slide {
          width: 300px;
          border-radius: 10px;
          opacity: 0.8;
          transition: 0.3s;
          padding-top: 60px;
          margin: 0px 50px;
          .slider-list {
            position: relative;
            max-width: 300px;
            width: 300px;
            height: 200px;
            cursor: pointer;

            img {
              object-fit: cover;
              border-radius: 10px;
              width: 300px;
              height: 200px;
            }

            .music-content {
              position: absolute;
              bottom: 0px;
              left: 0px;
              width: 100%;
              padding: 10px;
              border-radius: 10px;
              background: rgba(55, 55, 55, 0.7);

              span {
                font-size: 12px;
                color: #fff;
                text-align: center;
                width: 100%;
                display: inline-block;
                text-align: left;
              }

              .singer {
                color: #ccc;
                font-size: 14px;
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
  }

  .new-slider,
  .popular-slider {
    padding: 40px;
    width: 100%;
    ul {
      margin-top: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px 0px;

      li {
        border-radius: 10px;
        width: 100%;
        height: 100px;
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 75px;
        transition: 0.3s;

        &:hover {
          background: #1c1c1dff;
        }

        span {
        }

        .order {
          width: 5%;
        }

        .img-container {
          width: 15%;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }

        .music-name {
          width: 50%;
          strong {
          }
        }
        .date {
          width: 15%;
        }
        .like-count {
          width: 15%;
          display: flex;
          gap: 15px 0px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      }
    }
  }

  .artist-slider {
    width: 100%;
    display: flex;
    padding: 75px 40px 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabel-container {
      width: 45%;
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
        background: #1c1c1dff;
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
