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
import { userInfo } from "components/Login/state";
import * as functions from "../../common/functions";
import { musicListState } from "components/AddMusic/state";
import { async } from "@firebase/util";
const Record = ({
  className,
  width = "100%",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  const [isPlay, setIsPlay] = useState<boolean>(false);
  console.log("musicDetailData", musicDetailData);
  console.log("isPlay", isPlay);

  console.log("musicList", musicList);

  const onChangeCountData = async (type: string) => {
    const result = musicList?.map((item: any) => {
      if (item.id === musicDetailData?.id) {
        return {
          ...item,

          likeCount:
            type === "like" ? musicDetailData?.likeCount + 1 : item?.likeCount,
          likedClickList:
            type === "like"
              ? [
                  ...item?.likedClickList,
                  {
                    email: user?.email,
                    updateTiem: moment().format("YYYY-MM-DD HH:mm:ss"),
                  },
                ]
              : item?.likedClickList,

          downloadCount:
            type === "download"
              ? musicDetailData?.downloadCount + 1
              : item?.downloadCount,
          downloadClickList:
            type === "download"
              ? [
                  ...item?.downloadClickList,
                  {
                    email: user?.email,
                    updateTiem: moment().format("YYYY-MM-DD HH:mm:ss"),
                  },
                ]
              : item?.downloadClickList,
        };
      }
      return {
        ...item,
      };
    });
    console.log("result", result);
    await setMusicList(result);
  };

  useEffect(() => {
    functions.sendUpdateLikeDownloadCountFunction(musicList);
  }, [musicList]);

  console.log(
    "test",
    musicList
      ?.find((item: any) => item?.id === musicDetailData?.id)
      ?.downloadClickList?.find((i: any) => {
        return i?.email === user?.email;
      })?.email === user?.email
  );

  console.log("musicDetailData?.email", user?.email);
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
            {musicList
              ?.find((item: any) => item?.id === musicDetailData?.id)
              ?.likedClickList?.find((i: any) => {
                return i?.email === musicDetailData?.email;
              })?.email === musicDetailData?.email ? (
              <SVG src="/svg/heart.svg" />
            ) : (
              <SVG
                src="/svg/term_heart.svg"
                onClick={() => {
                  onChangeCountData("like");
                }}
              />
            )}

            <strong>
              {
                musicList?.find((item: any) => item?.id === musicDetailData?.id)
                  ?.likeCount
              }
            </strong>
          </div>
          <div className="like-download download">
            {musicList
              ?.find((item: any) => item?.id === musicDetailData?.id)
              ?.downloadClickList?.find((i: any) => {
                return i?.email === user?.email;
              })?.email === user?.email ? (
              <SVG src="/svg/download.svg" />
            ) : (
              <SVG
                src="/svg/term_download.svg"
                onClick={async () => {
                  onChangeCountData("download");
                }}
              />
            )}

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
