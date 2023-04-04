import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  height: 100%;

  h3 {
    padding: 20px 0px;
    width: 5%;
    border-bottom: 2px solid #ccc;
    position: relative;
    font-weight: bold;
  }

  .recommend-slider {
    padding: 90px 40px 110px;
    width: 100%;
    overflow: hidden;
    position: relative;

    .no-recommend-data {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -50%);
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

        /* .slick-track {
          min-width: 2624px;
        } */
        .slick-slide {
          width: 200px;
          border-radius: 10px;
          opacity: 0.8;
          transition: 0.3s;
          padding-top: 60px;
          margin: 0px 50px;

          .slider-list {
            position: relative;
            max-width: 200px;
            width: 200px;
            height: 225px;
            cursor: pointer;
            opacity: 0.8;
            transition: 0.3s;
            &:hover {
              transform: translateY(-5px);
              opacity: 1;
            }

            img {
              object-fit: cover;
              border-radius: 10px;
              width: 200px;
              height: 225px;
            }

            .music-content {
              position: absolute;
              bottom: 0px;
              left: 0px;
              width: 100%;
              padding: 10px;
              max-height: 225px;
              border-radius: 10px;
              background: rgba(55, 55, 55, 0.7);

              span {
                font-size: 12px;
                color: ${({ theme }) => theme.colors.DefaultText};
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

  .new-top-tables {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40px;
    .new-slider,
    .popular-slider {
      width: 45%;
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
            background: ${({ theme }) => theme.colors.BgHover};
          }

          span {
          }

          .order {
            width: 5%;
          }

          .img-container {
            width: 12.5%;
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

          .genre {
            width: 10%;
          }
          .date {
            font-size: 12px;
            width: 20%;
          }
          .like-count {
            width: 15%;
            display: flex;
            gap: 0px 15px;
            align-items: center;
            justify-content: center;
          }
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
        top: -40px;
        position: absolute;
      }

      & > div {
        border-radius: 10px;
        width: 100%;
        padding: 20px 40px;
        background: ${({ theme }) => theme.colors.BgHover};
        table {
          width: 100%;

          thead,
          tbody {
            padding-bottom: 0;
            tr {
              cursor: default;
              &:hover {
                background: ${({ theme }) => theme.colors.BgHover};
              }

              &:last-child {
                border: none;
              }
            }
          }
          tbody {
            max-height: 100%;
            min-height: 500px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1660px) {
    .recommend-slider {
      .slick-list {
        .slick-slide {
          width: 175px;

          .slider-list {
            max-width: 175px;
            width: 175px;
            height: 200px;

            img {
              width: 175px;
              height: 200px;
            }

            .music-content {
              max-height: 200px;

              span {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }

              .singer {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .new-top-tables {
      .new-slider,
      .popular-slider {
        width: 47.5%;

        ul {
          li {
            padding: 0px 25px;

            .order {
              margin-right: 10px;
            }

            .img-container {
              img {
                width: 45px;
                height: 45px;
              }
            }

            .music-name {
              width: 45%;
              margin: 0px 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              strong {
              }
            }

            .genre {
              width: 15%;
              margin-right: 10px;
            }

            .date {
              width: 30%;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 950px) {
    h3 {
      font-size: 12px;
    }
    .recommend-slider {
      padding: 90px 20px 110px;

      .slick-slider {
        height: 125px;

        .slick-arrow {
          &::before {
            font-size: 25px;
          }
        }

        .slick-list {
          .slick-slide {
            width: 100px;
            max-width: 100px;

            .slider-list {
              max-width: 100px;
              width: 100px;
              height: 125px;

              img {
                width: 100px;
                height: 125px;
              }

              .music-content {
                width: 100%;
                padding: 5px;
                max-height: 125px;

                span {
                  font-size: 10px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }

                .singer {
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }

    .new-top-tables {
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: column;
      padding: 20px;
      gap: 80px 0px;

      .new-slider,
      .popular-slider {
        width: 100%;

        ul {
          li {
            height: 75px;
            padding: 0px 50px;

            .img-container {
              img {
                width: 40px;
                height: 40px;
              }
            }

            .date {
              font-size: 10px;
            }
          }
        }
      }
    }

    .artist-slider {
      margin-top: 40px;
      padding: 75px 20px 150px;
      gap: 80px 0px;

      .tabel-container {
        width: 47.5%;

        h4 {
          font-size: 12px;
        }

        & > div {
          padding: 10px 15px 30px;
          table {
            thead {
              height: 50px;
            }

            thead,
            tbody {
              tr {
                height: 50px;
                th,
                td {
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    .recommend-slider {
      margin-top: 40px;
    }

    .new-top-tables {
      .new-slider,
      .popular-slider {
        ul {
          li {
            padding: 0px 15px;

            .genre {
              display: none;
            }
          }
        }
      }
    }

    .artist-slider {
      flex-wrap: wrap;
      flex-direction: column;

      .tabel-container {
        width: 100%;
      }
    }
  }
`;
