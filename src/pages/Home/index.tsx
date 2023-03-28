import { HomeContainer } from "./style";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import Tabel from "components/Table";
import SVG from "react-inlinesvg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  artistDownloadCountToptenState,
  artistLikeCountToptenState,
  musicNewDataListState,
  musicLikeCountToptenState,
} from "./state";

const Home = () => {
  const [musicLikeCountTopten, setMusicLikeCountTopten] = useRecoilState<any>(
    musicLikeCountToptenState
  );
  const [musicNewDataList, setMusicNewDataList] = useRecoilState<any>(
    musicNewDataListState
  );
  const [artistLikeCountTopten, setArtistLikeCountTopten] = useRecoilState<any>(
    artistLikeCountToptenState
  );

  const [artistDownloadCountTopten, setArtistDownloadCountTopten] =
    useRecoilState<any>(artistDownloadCountToptenState);

  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: "60px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
    draggable: true,
    slide: "div",
    arrows: true,
    pauseOnHover: true,
    vertical: false,
  };

  useEffect(() => {
    if (musicList) {
      setMusicLikeCountTopten(
        musicList
          ?.filter((item: any, idx: number) => idx < 10 && item)
          ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
      );

      setMusicNewDataList(
        musicList
          ?.filter((item: any, idx: number) => idx < 10 && item)
          ?.sort((a: any, b: any) => b?.date - a?.date)
      );

      setArtistLikeCountTopten([
        musicList?.reduce(function (
          accumulator: any,
          currentValue: {
            email?: any;
            likeCount?: any;
            img?: any;
            displayName?: any;
          }
        ) {
          const count = accumulator[currentValue?.displayName]?.likeCount || 0;

          return {
            ...accumulator,
            [currentValue?.displayName]: {
              displayName: currentValue?.displayName,
              img: currentValue?.img,
              email: currentValue?.email,
              likeCount: count + currentValue.likeCount,
            },
          };
        }, []),
      ]);

      setArtistDownloadCountTopten([
        musicList?.reduce(function (
          accumulator: any,
          currentValue: {
            email?: any;
            downloadCount?: any;
            img?: any;
            displayName?: any;
          }
        ) {
          const count = accumulator[currentValue?.email]?.downloadCount || 0;

          return {
            ...accumulator,

            [currentValue?.email]: {
              displayName: currentValue?.displayName,
              img: currentValue?.img,
              email: currentValue?.email,
              downloadCount: count + currentValue.downloadCount,
            },
          };
        }, []),
      ]);
    }
  }, [musicList]);

  return (
    <HomeContainer>
      <>
        <section className="recommend-slider">
          <h3>Recommend</h3>

          <Slider {...settings}>
            {musicList?.length !== 0 &&
              musicList?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="slider-list"
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "home",
                        });
                    setMusicDetailData(item);
                  }}
                >
                  <img src={item?.img} alt="" />

                  <div className="music-content">
                    <span>{item?.title}</span>
                    <span className="singer">{item?.singer}</span>
                  </div>
                </div>
              ))}
          </Slider>
        </section>
        <section className="new-slider">
          <h3>New</h3>
          <ul>
            {musicList?.length !== 0 &&
              musicNewDataList?.map((item: any, idx: number) => (
                <li
                  key={idx}
                  className="new-list list"
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "home",
                        });
                    setMusicDetailData(item);
                  }}
                >
                  <span className="order">{idx + 1}</span>
                  <div className="img-container">
                    <img src={item?.img} alt="" />
                  </div>
                  <div className="music-name">
                    <strong>{item?.title}</strong>-
                    <strong className="singer">{item?.singer}</strong>
                  </div>
                  <span className="date">{item?.date}</span>
                </li>
              ))}
          </ul>
        </section>
        <section className="popular-slider">
          <h3>Top</h3>
          <ul>
            {musicList?.length !== 0 &&
              musicLikeCountTopten?.map((item: any, idx: number) => (
                <li
                  key={idx}
                  className="top-list list"
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "home",
                        });
                    setMusicDetailData(item);
                  }}
                >
                  <span className="order">{idx + 1}</span>
                  <div className="img-container">
                    <img src={item?.img} alt="" />
                  </div>

                  <div className="music-name">
                    <strong>{item?.title}</strong>-
                    <strong className="singer">{item?.singer}</strong>
                  </div>
                  <div className="like-count">
                    <SVG src="/svg/heart.svg" />
                    <span>{item?.likeCount}</span>
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <section className="artist-slider">
          <div className="tabel-container">
            <h4>Top Artist Like Count</h4>
            <Tabel
              theadData={[
                {
                  title: "순위",
                },
                {
                  title: "",
                },
                {
                  title: "아티스트",
                },
                {
                  title: <SVG src="/svg/heart.svg" />,
                },
              ]}
            >
              {artistLikeCountTopten?.length !== 0 &&
                Object?.values(artistLikeCountTopten[0])
                  ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
                  ?.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        !user?.email
                          ? alert("로그인 후 이용해주세요")
                          : setIsDetailData({
                              isDetail: true,
                              isLocation: "home",
                            });
                      }}
                    >
                      <td>{idx + 1}</td>
                      <td>
                        <img src={item?.img} alt="" />
                      </td>
                      <td>{item?.displayName}</td>
                      <td>{item?.likeCount}</td>
                    </tr>
                  ))
                  ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)}
            </Tabel>
            {(musicList?.length === 0 || musicList === undefined) && (
              <p className="no-data">등록된 데이터가 없습니다.</p>
            )}
          </div>
          <div className="tabel-container">
            <h4>Top Artist Download Count</h4>
            <Tabel
              theadData={[
                {
                  title: "순위",
                },
                {
                  title: "",
                },

                {
                  title: "아티스트",
                },
                {
                  title: <SVG src="/svg/download.svg" />,
                },
              ]}
            >
              {artistDownloadCountTopten?.length !== 0 &&
                Object?.values(artistDownloadCountTopten[0])
                  ?.sort(
                    (a: any, b: any) => b?.downloadCount - a?.downloadCount
                  )

                  ?.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        !user?.email
                          ? alert("로그인 후 이용해주세요")
                          : setIsDetailData({
                              isDetail: true,
                              isLocation: "home",
                            });
                      }}
                    >
                      <td>{idx + 1}</td>
                      <td>
                        <img src={item?.img} alt="" />
                      </td>
                      <td>{item?.displayName}</td>
                      <td>{item?.downloadCount}</td>
                    </tr>
                  ))
                  ?.sort((a: any, b: any) => b?.date - a?.date)}
            </Tabel>
            {(musicList?.length === 0 || musicList === undefined) && (
              <p className="no-data">등록된 데이터가 없습니다.</p>
            )}
          </div>
        </section>
      </>

      {isDetailData?.isDetail && isDetailData?.isLocation === "home" && (
        <MusicDetail detailData={musicDetailData}></MusicDetail>
      )}
    </HomeContainer>
  );
};

export default Home;
