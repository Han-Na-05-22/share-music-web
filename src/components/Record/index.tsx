import { RecordProps } from "./interface";
import { RecordContainer } from "./style";
import SVG from "react-inlinesvg";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { musicDetailState } from "components/MusicDetail/state";
import { useRecoilState } from "recoil";
import moment from "moment";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import { selectFilterState } from "pages/MusicTable/state";
import { musicApi } from "common/api/music";
import { useMutation, useQueryClient } from "react-query";

const Record = ({
  className,
  width = "100%",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const quertyClient = useQueryClient();
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  const { mutate: updateMusicLikeCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData("like", musicList, musicDetailData, user),
    {
      onError: (error) => {
        console.log("error:", error);
      },
      onSuccess: async () => {
        await quertyClient.invalidateQueries("getMusicAllDataList");
      },
    }
  );

  const { mutate: updateMusicDownloadCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData(
        "download",
        musicList,
        musicDetailData,
        user
      ),
    {
      onError: (error) => {
        console.log("error: ", error);
      },
      onSuccess: async () => {
        await quertyClient.invalidateQueries("getMusicAllDataList");
      },
    }
  );

  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [isPlay, setIsPlay] = useState<boolean>(false);

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
              onClick={(e: any) => {
                if (musicDetailData?.email !== user?.email) {
                  updateMusicLikeCount();
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
                musicList?.find((item: any) => item?.id === musicDetailData?.id)
                  ?.likeCount
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
              onClick={async (e: any) => {
                if (musicDetailData?.email !== user?.email) {
                  updateMusicDownloadCount();
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
                musicList?.find((item: any) => item?.id === musicDetailData?.id)
                  ?.downloadCount
              }
            </strong>
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
