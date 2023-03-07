import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  musicDetailState,
  musicDetailUrlState,
} from "components/MusicDetail/state";
import { useRecoilState } from "recoil";
import moment from "moment";

const Record = ({
  className,
  width = "100%",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  console.log("isPlay", isPlay);

  return (
    <RecordContainer className={className} width={width} height={height}>
      <div className="add-date">
        {moment(musicDetailData?.date).format("YYYY-MM-DD")}
      </div>
      <img src={musicDetailData?.img} alt="음원 이미지" />
      <div className="about-music top">
        <strong className="title">{musicDetailData?.title} </strong>
        <b>-</b>
        <strong> {musicDetailData?.singer}</strong>
      </div>

      <AudioPlayer
        autoPlay={isPlay}
        src={musicDetailUrl}
        onPause={() => setIsPlay(false)}
        onPlay={(e) => {
          setIsPlay(true);
          console.log("onPlay");
        }}
      />
      <div className="about-music-artists">
        {/* <span>{musicDetailData?.email?.split("@")[0]} </span> */}
        <div className="like-download-counts">
          <div className="like-download like">
            <SVG src="/svg/heart.svg" />
            <strong>{musicDetailData?.likeCount}</strong>
          </div>
          <div className="like-download download">
            <SVG src="/svg/download.svg" />
            <strong>{musicDetailData?.downloadCount}</strong>
          </div>
        </div>
      </div>
      <div className="about-music bottom">
        <p>{musicDetailData?.explanation}</p>
      </div>
    </RecordContainer>
  );
};

export default Record;
