import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect } from "react";

// todo : 디자인 일부 수정돰! --- 주말 작업 예정
// todo : 레코드는 레코드만, 뮤직 컨트롤바 컴포넌트 만들기(재생, 다음, 이전), 마이 뮤직리스트 컴포넌트 만든 후 레코드, 컨트롤바 등 취합해서 만들기(스와이퍼 또는 슬릭 슬라이드 사용 // 음원값에 맞는 좋아요 수 서버에서 받아와야함!) --- 주말 작업 예정

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
