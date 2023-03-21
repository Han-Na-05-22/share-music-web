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
import * as functions from "../../common/functions";
import { musicListState } from "components/AddMusic/state";
import { selectFilterState } from "pages/MusicTable/state";

const Record = ({
  className,
  width = "100%",
  height = "100%",
  onClick,
}: RecordProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);

  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const onChangeCountData = async (type: string) => {
    if (type === "like") {
      const result = musicList?.map((item: any) => {
        if (item.id === musicDetailData?.id) {
          if (
            item?.likedClickList?.find((i: any) => i?.email === user?.email)
          ) {
            return {
              ...item,

              likeCount:
                type === "like" ? item?.likeCount - 1 : item?.likeCount,
              likedClickList:
                type === "like"
                  ? item?.likedClickList?.filter(
                      (i: any) => i?.email !== user?.email
                    )
                  : item?.likedClickList,
            };
          } else {
            return {
              ...item,

              likeCount:
                type === "like" ? item?.likeCount + 1 : item?.likeCount,
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
            };
          }
        }
        return {
          ...item,
        };
      });

      await setMusicList(result);
      await functions?.sendUpdateLikeDownloadCountFunction(result);
    }
    if (type === "download") {
      const result = musicList?.map((item: any) => {
        if (item.id === musicDetailData?.id) {
          if (
            item?.downloadClickList?.find((i: any) => i?.email === user?.email)
          ) {
            return {
              ...item,

              downloadCount:
                type === "download"
                  ? item?.downloadCount - 1
                  : item?.downloadCount,
              downloadClickList:
                type === "download"
                  ? item?.downloadClickList?.filter(
                      (i: any) => i?.email !== user?.email
                    )
                  : item?.downloadClickList,
            };
          } else {
            return {
              ...item,

              downloadCount:
                type === "download"
                  ? item?.downloadCount + 1
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
        }
        return {
          ...item,
        };
      });

      await setMusicList(result);
      await functions?.sendUpdateLikeDownloadCountFunction(result);
    }
    await functions?.getMusicListDataFunction(setMusicList);
  };

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
                  onChangeCountData("like");
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
                  onChangeCountData("download");
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
