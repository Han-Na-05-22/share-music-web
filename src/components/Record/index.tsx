import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect } from "react";
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
  width = "1000px",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  return (
    <RecordContainer className={className} width={width} height={height}>
      <div className="add-date">
        {moment(musicDetailData?.date).format("YYYY-MM-DD")}
      </div>
      <img src={musicDetailData?.img} alt="음원 이미지" />
      <div className="about-music top">
        <strong className="title">{musicDetailData?.title}</strong>
        <strong>{musicDetailData?.singer}</strong>
      </div>

      <AudioPlayer
        // autoPlay
        src={musicDetailUrl}
        onPlay={(e) => console.log("onPlay")}
      />
      <div className="about-music bottom">
        <span>{musicDetailData?.email?.split("@")[0]}</span>
        <p>{musicDetailData?.explanation}</p>
      </div>
    </RecordContainer>
  );
};

export default Record;
