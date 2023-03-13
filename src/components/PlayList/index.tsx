import { PlayListProps } from "./interface";
import { PlayListContainer } from "./style";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Overlay from "components/Overlay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilState } from "recoil";
import {
  isMusicDetailState,
  musicDetailUrlState,
} from "components/MusicDetail/state";
import SVG from "react-inlinesvg";
import * as functions from "../../common/functions";
import Button from "components/Button";
import { useEffect, useState } from "react";
const PlayList = ({ className, children, playListData }: PlayListProps) => {
  console.log("playListData", playListData);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "10px",
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);
  console.log("musicDetailUrl", musicDetailUrl);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);

  return (
    <Overlay>
      <PlayListContainer className={className}>
        <Button
          className="play-list-btn"
          btnType={"submit"}
          width="75px"
          onClick={async () => {
            setIsDetailData({
              isDetail: false,
              isLocation: "",
            });
          }}
        >
          닫기
        </Button>
        {playListData?.length !== 0 && playListData?.length !== undefined ? (
          <>
            <Slider {...settings}>
              {playListData?.map((item: any) => (
                <div
                  className="paly-list-container"
                  onClick={() => {
                    functions.getMusicUrlFunction(
                      item?.email,
                      setMusicDetailUrl,
                      item?.mp3
                    );
                  }}
                >
                  <img src={item?.img} alt="음원 이미지" />
                  <div className="about-music">
                    <strong className="title">제목 : {item?.title} </strong>
                    <strong>가수 : {item?.singer}</strong>
                    <p>설명 : {item?.explanation}</p>
                  </div>
                </div>
              ))}
            </Slider>
            <AudioPlayer
              // autoPlay
              src={musicDetailUrl}
              onPlay={(e) => console.log("onPlay")}
            />
          </>
        ) : (
          "등록된 음악이 없습니다."
        )}
      </PlayListContainer>
    </Overlay>
  );
};

export default PlayList;
