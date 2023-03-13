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
import { selectFilterState } from "pages/MusicTable/state";

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
    }
  };

  useEffect(() => {
    if (!selectFilter) {
      functions.sendUpdateLikeDownloadCountFunction(musicList);
    }
  }, [musicList]);

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
                return i?.email === user?.email;
              })?.email === user?.email ? (
              <SVG
                src="/svg/heart.svg"
                onClick={() => {
                  onChangeCountData("like");
                }}
              />
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
              <SVG
                src="/svg/download.svg"
                onClick={async () => {
                  onChangeCountData("download");
                }}
              />
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
