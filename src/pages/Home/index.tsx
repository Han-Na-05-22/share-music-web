import { HomeContainer } from "./style";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import { useQueryClient } from "react-query";
import { myMusicPlayListState } from "pages/MyPage/state";
import MusicDetail from "components/MusicDetail";
import Tabel from "components/Table";
import SVG from "react-inlinesvg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import {
  artistDownloadCountToptenState,
  artistLikeCountToptenState,
  musicNewDataListState,
  musicLikeCountToptenState,
} from "./state";

const Home = () => {
  const queryClient = useQueryClient();
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
  console.log("artistDownloadCountTopten", artistDownloadCountTopten);
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);

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

          <Swiper
            modules={[Autoplay]}
            centeredSlides={true}
            allowTouchMove={true}
            autoplay={{
              delay: 0,
              reverseDirection: false,
            }}
            speed={3000}
            loop={true}
            loopPreventsSliding={true}
            slidesPerView={4}
            grabCursor={true}
            className="mySwiper"
          >
            {musicList?.length !== 0 &&
              musicList?.map((item: any, idx: number) => (
                <SwiperSlide
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
                  <div className="test">
                    <img src={item?.img} alt="" />{" "}
                    <div className="circle"></div>
                  </div>
                  <div>{item?.title}</div>
                  <div className="singer">{item?.singer}</div>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <section className="new-slider">
          <h3>New</h3>
          <Swiper
            spaceBetween={100}
            modules={[Autoplay]}
            centeredSlides={true}
            allowTouchMove={true}
            autoplay={{
              delay: 0,
              reverseDirection: false,
            }}
            speed={3000}
            loop={true}
            loopPreventsSliding={true}
            slidesPerView={5}
            grabCursor={true}
            className="mySwiper2"
          >
            {musicList?.length !== 0 &&
              musicNewDataList?.map((item: any, idx: number) => (
                <SwiperSlide
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
                  {" "}
                  <div className="date">{item?.date}</div>
                  <div className="test">
                    <img src={item?.img} alt="" />
                  </div>
                  <div>{item?.title}</div>
                  <div className="singer">{item?.singer}</div>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <section className="popular-slider">
          <h3>Top</h3>
          <Swiper
            spaceBetween={100}
            modules={[Autoplay]}
            centeredSlides={true}
            allowTouchMove={true}
            autoplay={{
              delay: 0,
              reverseDirection: false,
            }}
            speed={3000}
            loop={true}
            loopPreventsSliding={true}
            slidesPerView={6}
            grabCursor={true}
            className="mySwiper2"
          >
            {musicList?.length !== 0 &&
              musicLikeCountTopten?.map((item: any, idx: number) => (
                <SwiperSlide
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
                  <div className="count">{item?.likeCount}</div>
                  <div className="test">
                    <img src={item?.img} alt="" />{" "}
                    {/* <div className="circle"></div> */}
                  </div>
                  <div>{item?.title}</div>
                  <div className="singer">{item?.singer}</div>{" "}
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <section className="artist-slider">
          <div className="tabel-container">
            <h4>Top Artist Like Count</h4>
            <Tabel
              tableBtnText={""}
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
              tableBtnText={""}
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
