import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect } from "react";

// todo : 음악 플레이어 AudioPlayer 라이브러리 사용 (삭제할지 말지 정해야함)

const Record = ({
  className,
  width = "250px",
  height = "250px",
  isCircle = true,
  onClickPlay,
  isPlay = false,
  onClick,
}: RecordProps) => {
  useEffect(() => {}, [isPlay, onClickPlay]);

  return (
    <RecordContainer
      className={className}
      width={width}
      height={height}
      isPlay={isPlay}
      onClick={onClickPlay}
    >
      <div className={isPlay ? "record-content play" : "record-content pause"}>
        <img src="/image/test-pic.jpeg" alt="" />
      </div>
      {isCircle && <div className="circle"></div>}
      {isPlay ? <SVG src="/svg/pause.svg" /> : <SVG src="/svg/play.svg" />}
    </RecordContainer>
  );
};

export default Record;
