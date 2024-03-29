import { PlayListProps } from "./interface";
import { PlayListContainer } from "./style";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRecoilState } from "recoil";
import { isMusicDetailState } from "components/MusicDetail/state";
import SVG from "react-inlinesvg";
import Button from "components/Button";
import { useEffect, useRef, useState } from "react";
import { userInfo } from "components/Login/state";
import { playListIndexState } from "./state";
import { UserProps } from "components/Login/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";

// 나의 플레이리스트(화면 하단에 고정)
const PlayList = ({
  className,
  children,
  playListData,
  onClick,
  play = false,
}: PlayListProps) => {
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [idx, setIdx] = useRecoilState<any>(playListIndexState);
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [isPlay, setIsPlay] = useState<boolean>(play);
  const player = useRef<any>();
  useEffect(() => {
    if (isDetailData?.isLocation === "download") {
      setIsPlay(false);
    }
  }, [isDetailData]);

  useEffect(() => {
    player.current?.audio?.current?.pause();
  }, [idx]);

  return (
    <PlayListContainer>
      <div className={className}>
        {className === "detail-play-list" && (
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
        )}
        {user?.email ? (
          playListData?.length !== 0 &&
          playListData?.length !== undefined &&
          playListData[0]?.title !== "" ? (
            <>
              <div className="paly-list-container" onClick={onClick}>
                <span className="about-genre">{playListData[idx]?.genre}</span>
                <SVG
                  src="/svg/prev.svg"
                  className="prev-btn btn"
                  onClick={(
                    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
                  ) => {
                    e.stopPropagation();
                    setIsPlay(false);
                    idx === 0
                      ? setIdx(playListData?.length - 1)
                      : setIdx(idx - 1);
                  }}
                />
                <div className={isPlay ? "img-ani ani" : "img-ani-paused ani"}>
                  <img src={playListData[idx]?.img} alt="음원 이미지" />
                </div>

                <div className="about-music">
                  <strong className="title">{playListData[idx]?.title}</strong>
                  {className !== "detail-play-list" && <span> - </span>}
                  <strong>{playListData[idx]?.singer}</strong>
                  <ul className="counts">
                    <li>
                      <SVG src="/svg/heart.svg" />
                      <strong>{playListData[idx]?.likeCount}</strong>
                    </li>
                    <li>
                      <SVG src="/svg/download.svg" />
                      <strong>{playListData[idx]?.downloadCount}</strong>
                    </li>
                  </ul>

                  <p className="explanation">
                    {playListData[idx]?.explanation}
                  </p>
                </div>
                <SVG
                  src="/svg/next.svg"
                  className="next-btn btn"
                  onClick={(
                    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
                  ) => {
                    e.stopPropagation();
                    setIsPlay(false);
                    playListData?.length - 1 === idx
                      ? setIdx(0)
                      : setIdx(idx + 1);
                  }}
                />
              </div>

              <AudioPlayer
                ref={player}
                showDownloadProgress={true}
                autoPlay={isPlay}
                autoPlayAfterSrcChange={false}
                preload={"metadata"}
                src={playListData[idx]?.url}
                onPause={() => {
                  setIsPlay(false);
                }}
                onPlay={() => {
                  setIsPlay(true);
                }}
              />
            </>
          ) : (
            <p className="no-data">내 플레이리스트에 추가된 음악이 없습니다.</p>
          )
        ) : (
          <p className="no-data">로그인 후 이용해주시기 바랍니다.</p>
        )}
      </div>
    </PlayListContainer>
  );
};

export default PlayList;
