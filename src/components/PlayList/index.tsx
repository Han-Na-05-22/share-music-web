import { PlayListProps } from "./interface";
import { PlayListContainer } from "./style";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Overlay from "components/Overlay";
import { useRecoilState } from "recoil";
import { isMusicDetailState } from "components/MusicDetail/state";
import SVG from "react-inlinesvg";
import Button from "components/Button";
import { useState } from "react";

const PlayList = ({ className, children, playListData }: PlayListProps) => {
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [idx, setIdx] = useState<any>(0);

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
            <div className="paly-list-container">
              <div className="about-genre">{playListData[idx]?.genre}</div>
              <SVG
                src="/svg/prev.svg"
                className="prev-btn btn"
                onClick={() => {
                  idx === 0
                    ? setIdx(playListData?.length - 1)
                    : setIdx(idx - 1);
                }}
              />
              <img src={playListData[idx]?.img} alt="음원 이미지" />
              <div className="about-music">
                <strong className="title">
                  제목 : {playListData[idx]?.title}{" "}
                </strong>
                <strong>가수 : {playListData[idx]?.singer}</strong>
                <p>설명 : {playListData[idx]?.explanation}</p>
              </div>
              <SVG
                src="/svg/next.svg"
                className="next-btn btn"
                onClick={() => {
                  playListData?.length - 1 === idx
                    ? setIdx(0)
                    : setIdx(idx + 1);
                }}
              />
            </div>

            <AudioPlayer src={playListData[idx]?.url} />
          </>
        ) : (
          "등록된 음악이 없습니다."
        )}
      </PlayListContainer>
    </Overlay>
  );
};

export default PlayList;
