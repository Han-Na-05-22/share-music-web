import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect } from "react";

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
  console.log("!!!!!", isPlay);
  console.log("onClickPlay", onClickPlay);
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
