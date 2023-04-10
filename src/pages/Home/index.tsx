import { HomeContainer } from "./style";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { allUserInfo, userInfo } from "components/Login/state";
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
import { UserProps } from "components/Login/interface";
import { MusicFormProps } from "components/AddMusic/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";

const Home = () => {
  const [musicLikeCountTopten, setMusicLikeCountTopten] = useRecoilState<
    MusicFormProps[]
  >(musicLikeCountToptenState);
  const [userAll, setUserAll] = useRecoilState<UserProps[]>(allUserInfo);
  const [musicNewDataList, setMusicNewDataList] = useRecoilState<
    MusicFormProps[]
  >(musicNewDataListState);
  const [artistLikeCountTopten, setArtistLikeCountTopten] = useRecoilState<any>(
    artistLikeCountToptenState,
  );

  const [artistDownloadCountTopten, setArtistDownloadCountTopten] =
    useRecoilState<any>(artistDownloadCountToptenState);

  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<MusicFormProps>(musicDetailState);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    centerMode: true,
    centerPadding: "60px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    loop: true,
    draggable: true,
    slide: "div",
    arrows: true,
    pauseOnHover: true,
    vertical: false,
  };

  // musicList 안에 있는 데이터 10개를 랜덤으로 가져와 저장(추천 음악리스트에 사용)
  const [recommendMusicList, setRecommendMusicList] =
    useState<MusicFormProps[]>();

  const getRecommendMusicList = useMemo(() => {
    return musicList
      ?.map((item: MusicFormProps) => {
        return item;
      })
      ?.sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }, [musicList]);
  console.log("dqwfdwqf", musicNewDataList);
  useEffect(() => {
    if (musicList) {
      setRecommendMusicList(getRecommendMusicList);
      setMusicLikeCountTopten(
        musicList
          ?.map((item: MusicFormProps) => item)
          ?.sort(
            (a: MusicFormProps, b: MusicFormProps) =>
              b?.likeCount - a?.likeCount,
          ),
      );

      setMusicNewDataList(
        musicList
          ?.map((item: MusicFormProps) => item)
          ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.date - a?.date),
      );

      setArtistLikeCountTopten([
        musicList?.reduce(function (
          accumulator: any,
          currentValue: {
            email: string;
            likeCount: number;
            img: string;
            displayName: string;
          },
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
            email: string;
            downloadCount: number;
            img: string;
            displayName: string;
          },
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
            {recommendMusicList &&
              recommendMusicList?.map((item: MusicFormProps, idx: number) => (
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
                  <img src={item?.img} alt="음원 이미지" />

                  <div className="music-content">
                    <span>{item?.title}</span>
                    <span className="singer">{item?.singer}</span>
                  </div>
                </div>
              ))}
          </Slider>
          {musicList[0].email === "" && (
            <p className="no-recommend-data">데이터가 없습니다.</p>
          )}
        </section>
        <section className="new-top-tables">
          <div className="new-slider">
            <h3>New</h3>
            <ul>
              {musicList[0]?.email !== "" ? (
                musicNewDataList?.map(
                  (item: MusicFormProps, idx: number) =>
                    idx < 10 && (
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
                          <img src={item?.img} alt="음원 이미지" />
                        </div>
                        <div className="music-name">
                          <strong>{item?.title}</strong>-
                          <strong className="singer">{item?.singer}</strong>
                        </div>
                        <span className="genre">{item?.genre}</span>
                        <span className="date">
                          {item?.date?.substr(0, 10)}
                        </span>
                      </li>
                    ),
                )
              ) : (
                <li>
                  <p className="no-list-data">데이터가 없습니다.</p>
                </li>
              )}
            </ul>
          </div>
          <div className="popular-slider">
            <h3>Top10</h3>
            <ul>
              {musicList[0]?.email !== "" ? (
                musicLikeCountTopten?.map(
                  (item: MusicFormProps, idx: number) =>
                    idx < 10 && (
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
                          <img src={item?.img} alt="음원 이미지" />
                        </div>

                        <div className="music-name">
                          <strong>{item?.title}</strong>-
                          <strong className="singer">{item?.singer}</strong>
                        </div>
                        <span className="genre">{item?.genre}</span>
                        <div className="like-count">
                          <SVG src="/svg/heart.svg" />
                          <span>{item?.likeCount}</span>
                        </div>
                      </li>
                    ),
                )
              ) : (
                <li>
                  <p className="no-list-data">데이터가 없습니다.</p>
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className="artist-slider">
          <div className="tabel-container">
            <h4>⭐️ Top7 Artist Like</h4>
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
              {userAll?.length !== 0 &&
              musicList[0]?.email !== "" &&
              artistLikeCountTopten[0] !== undefined ? (
                Object?.values(artistLikeCountTopten[0])
                  ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
                  ?.map(
                    (item: any, idx: number) =>
                      idx < 7 && (
                        <tr
                          key={idx}
                          onClick={(
                            e: React.MouseEvent<
                              HTMLTableRowElement,
                              MouseEvent
                            >,
                          ) => {
                            e.stopPropagation();
                          }}
                        >
                          <td>{idx + 1}</td>
                          <td>
                            <img src={item?.img} alt="" />
                          </td>
                          <td>{item?.displayName}</td>
                          <td>{item?.likeCount}</td>
                        </tr>
                      ),
                  )
                  ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
              ) : (
                <tr>
                  <td>
                    <p className="no-data">데이터가 없습니다.</p>
                  </td>
                </tr>
              )}
            </Tabel>
            {(musicList?.length === 0 || musicList === undefined) && (
              <p className="no-data">등록된 데이터가 없습니다.</p>
            )}
          </div>
          <div className="tabel-container">
            <h4>⭐️ Top7 Artist Download</h4>
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
              {userAll?.length !== 0 &&
              musicList[0]?.email !== "" &&
              artistDownloadCountTopten[0] !== undefined ? (
                Object?.values(artistDownloadCountTopten[0])
                  ?.sort(
                    (a: any, b: any) => b?.downloadCount - a?.downloadCount,
                  )
                  ?.map(
                    (item: any, idx: number) =>
                      idx < 7 && (
                        <tr
                          key={idx}
                          onClick={(
                            e: React.MouseEvent<
                              HTMLTableRowElement,
                              MouseEvent
                            >,
                          ) => {
                            e.stopPropagation();
                          }}
                        >
                          <td>{idx + 1}</td>
                          <td>
                            <img src={item?.img} alt="" />
                          </td>
                          <td>{item?.displayName}</td>
                          <td>{item?.downloadCount}</td>
                        </tr>
                      ),
                  )
                  ?.sort((a: any, b: any) => b?.date - a?.date)
              ) : (
                <tr>
                  <td>
                    <p className="no-data">데이터가 없습니다.</p>
                  </td>
                </tr>
              )}
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
