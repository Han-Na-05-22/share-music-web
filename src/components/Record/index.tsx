import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRecoilState } from "recoil";
import moment from "moment";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import { musicApi } from "common/api/music";
import { useMutation, useQueryClient } from "react-query";
import { UserProps } from "components/Login/interface";
import { MusicFormProps } from "components/AddMusic/interface";
import { musicDetailState } from "components/MusicDetail/state";
import { isCurrentAudioState } from "./state";
import Loading from "components/Loading";

const Record = ({
  className,
  width = "100%",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [isCurrentAudio, setIsCurrentAudio] =
    useRecoilState<boolean>(isCurrentAudioState);
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const quertyClient = useQueryClient();
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<MusicFormProps>(musicDetailState);
  const player = useRef<any>();

  const { mutate: updateMusicLikeCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData("like", musicList, musicDetailData, user),
    {
      onError: (error) => {
        console.log("error:", error);
      },
      onSuccess: () => {
        quertyClient.invalidateQueries("getMusicAllDataList");
      },
    },
  );

  const { mutate: updateMusicDownloadCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData(
        "download",
        musicList,
        musicDetailData,
        user,
      ),
    {
      onError: (error) => {
        console.log("error: ", error);
      },
      onSuccess: () => {
        quertyClient.invalidateQueries("getMusicAllDataList");
      },
    },
  );

  const [isPlay, setIsPlay] = useState<boolean>(false);

  useEffect(() => {
    if (player?.current?.audio?.current?.duration) {
      setIsCurrentAudio(true);
    }
  }, [player?.current?.audio?.current?.duration]);

  return (
    <RecordContainer className={className} width={width} height={height}>
      <div className="add-date">
        {moment(musicDetailData?.date).format("YYYY-MM-DD")}
      </div>
      <div className="about-genre">{musicDetailData?.genre}</div>
      <img className="music-img" src={musicDetailData?.img} alt="음원 이미지" />
      <div className="about-music top">
        <strong className="title">{musicDetailData?.title} </strong>
        <b>-</b>
        <strong> {musicDetailData?.singer}</strong>
      </div>

      <AudioPlayer
        ref={player}
        autoPlay={isPlay}
        src={musicDetailData?.url}
        onPause={() => setIsPlay(false)}
        onPlay={(e) => {
          setIsPlay(true);
        }}
      />
      <div className="about-music-artists">
        <div className="like-download-counts">
          <div className="like-download like">
            <SVG
              src={`/svg/${
                musicList
                  ?.find((item: any) => item?.id === musicDetailData?.id)
                  ?.likedClickList?.find((i: any) => {
                    return i?.email === user?.email;
                  })?.email === user?.email
                  ? "heart"
                  : "/term_heart"
              }.svg`}
              onClick={(e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
                if (musicDetailData?.email !== user?.email) {
                  e.preventDefault();
                  updateMusicLikeCount();
                  setIsPlay(false);
                } else {
                  e.stopPropagation();
                }
              }}
              className={
                musicDetailData?.email !== user?.email
                  ? "clicked-svg"
                  : "no-clicked-svg"
              }
            />

            <strong>
              {
                musicList?.find(
                  (item: MusicFormProps) => item?.id === musicDetailData?.id,
                )?.likeCount
              }
            </strong>
          </div>
          <div className="like-download download">
            <SVG
              src={`/svg/${
                musicList
                  ?.find((item: any) => item?.id === musicDetailData?.id)
                  ?.downloadClickList?.find((i: any) => {
                    return i?.email === user?.email;
                  })?.email === user?.email
                  ? "download"
                  : "term_download"
              }.svg`}
              onClick={async (
                e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
              ) => {
                if (musicDetailData?.email !== user?.email) {
                  e.preventDefault();
                  updateMusicDownloadCount();
                  setIsPlay(false);
                } else {
                  e.stopPropagation();
                }
              }}
              className={
                musicDetailData?.email !== user?.email
                  ? "clicked-svg"
                  : "no-clicked-svg"
              }
            />

            <strong>
              {
                musicList?.find(
                  (item: MusicFormProps) => item?.id === musicDetailData?.id,
                )?.downloadCount
              }
            </strong>
          </div>
        </div>
      </div>
      <div className="about-music bottom">
        <p>{musicDetailData?.explanation}</p>
      </div>
      {!isCurrentAudio && <Loading className="music-detail-loading"></Loading>}
    </RecordContainer>
  );
};

export default Record;
