import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { filterMusicListState, selectFilterState } from "./state";
import CheckBox from "components/CheckBox";
import Button from "components/Button";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import { myMusicPlayListState } from "pages/MyPage/state";
import { userInfo } from "components/Login/state";
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";
import { UserProps } from "components/Login/interface";
import { MusicFormProps } from "components/AddMusic/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";

const MusicTable = () => {
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [filterMusicList, setFilterMusicList] =
    useRecoilState<MusicFormProps[]>(filterMusicListState);

  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [limit, setLimit] = useState<number>(15);
  const [page, setPage] = useState<number>(1);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [addMusicPlayer, setAddMusicPlayer] = useState<any[]>([]);

  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<MusicFormProps[]>(myMusicPlayListState);
  const offset = (page - 1) * limit;

  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<MusicFormProps>(musicDetailState);
  const quertyClient = useQueryClient();
  const { mutate: updateMusicDownloadAllCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData(
        "download-all",
        musicList,
        addMusicPlayer,
        user
      ),
    {
      onError: (error) => {
        console.log("error:", error);
      },
      onSuccess: async () => {
        await quertyClient.invalidateQueries("getMusicAllDataList");
      },
    }
  );

  const onCheckedAllMusic = () => {
    let array: any = "";
    if (
      (addMusicPlayer?.length !== 0 &&
        addMusicPlayer?.length +
          myMusicPlayList?.filter(
            (i: MusicFormProps) => i?.genre === selectFilter
          )?.length ===
          filterMusicList?.length) ||
      (addMusicPlayer?.length !== 0 &&
        addMusicPlayer?.length + myMusicPlayList?.length ===
          filterMusicList?.length)
    ) {
      setAddMusicPlayer([]);
    } else {
      filterMusicList?.forEach((i: MusicFormProps) => {
        if (
          !myMusicPlayList?.map((j: MusicFormProps) => j?.id)?.includes(i?.id)
        ) {
          array = [...array, i?.id];
        }
        setAddMusicPlayer(array);
      });
    }
  };

  const onCheckedMusic = (id: number) => {
    if (addMusicPlayer?.length === 0) {
      setAddMusicPlayer([id]);
    } else {
      addMusicPlayer?.includes(id)
        ? setAddMusicPlayer(
            addMusicPlayer?.filter((item: number) => item !== id)
          )
        : setAddMusicPlayer((prev: any) => [...prev, id]);
    }
  };

  const handleChangePage = (page: number) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  const allCheckd =
    filterMusicList[0]?.email === "" ||
    selectFilter === "MyMusic" ||
    selectFilter === "Playlist" ||
    myMusicPlayList?.filter((i: any) => i?.genre === selectFilter)?.length ===
      filterMusicList?.length ||
    musicList?.length === myMusicPlayList?.length;

  useEffect(() => {
    if (selectFilter === "MyMusic" && musicList[0]?.email !== "") {
      const result = musicList?.filter(
        (item: MusicFormProps) => item?.email === user?.email
      );

      setFilterMusicList(result);
    }

    if (selectFilter === "Playlist") {
      setFilterMusicList(myMusicPlayList);
    }

    if (selectFilter === "New") {
      const result = musicList
        ?.map((item: MusicFormProps) => item)
        ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.date - a?.date);

      setFilterMusicList(result);
    }

    if (selectFilter === "Popular") {
      const result = musicList
        ?.map((item: MusicFormProps) => item)
        ?.sort(
          (a: MusicFormProps, b: MusicFormProps) => b?.likeCount - a?.likeCount
        );

      setFilterMusicList(result);
    }
  }, [selectFilter, musicList, myMusicPlayList]);

  return (
    <>
      <MusicTableContainer>
        <Button
          className="my-info-submit"
          fontSize="16px"
          btnType={user?.email ? "submit" : "none"}
          onClick={async () => {
            if (addMusicPlayer?.length === 0) {
              alert("추가에 실패하였습니다.");
            } else {
              await updateMusicDownloadAllCount();
              alert("추가가 완료되었습니다.");
            }
          }}
        >
          추가
        </Button>

        <div className="tabel-container">
          <Tabel
            className={
              filterMusicList[0]?.email === "" || filterMusicList?.length === 0
                ? "no-tabel-data"
                : ""
            }
            theadData={[
              {
                title: (
                  <CheckBox
                    disabled={
                      filterMusicList[0]?.email === "" ||
                      selectFilter === "MyMusic" ||
                      selectFilter === "Playlist" ||
                      myMusicPlayList?.filter(
                        (i: MusicFormProps) => i?.genre === selectFilter
                      )?.length === filterMusicList?.length ||
                      musicList?.length === myMusicPlayList?.length
                    }
                    onClick={(e) => {
                      e.stopPropagation();

                      if (!allCheckd) {
                        onCheckedAllMusic();
                      }
                    }}
                    onChange={() => {}}
                    checked={
                      (addMusicPlayer?.length + myMusicPlayList?.length ===
                        filterMusicList?.length &&
                        myMusicPlayList?.length !== filterMusicList?.length) ||
                      filterMusicList?.length ===
                        myMusicPlayList?.filter(
                          (i: any) => i?.genre === selectFilter
                        )?.length +
                          addMusicPlayer?.length
                        ? true
                        : false
                    }
                  ></CheckBox>
                ),
              },
              {
                title: selectFilter === "Popular" ? "순위" : "순번",
              },
              {
                title: "음원",
              },
              {
                title: "제목",
              },
              {
                title: "가수",
              },
              {
                title: "장르",
              },
              {
                title: <SVG src="/svg/heart.svg" />,
              },
              {
                title: <SVG src="/svg/download.svg" />,
              },
              {
                title: "소유자",
              },
              {
                title: "등록일",
              },
            ]}
          >
            {(filterMusicList[0]?.email !== "" &&
              filterMusicList[0]?.title !== undefined) ||
            filterMusicList?.length !== 0 ? (
              filterMusicList
                ?.slice(offset, offset + limit)
                ?.sort((a: MusicFormProps, b: MusicFormProps) => {
                  if (selectFilter === "Popular") {
                    return b?.likeCount - a?.likeCount;
                  } else {
                    return b?.id - a?.id;
                  }
                })
                ?.map((item: MusicFormProps, idx: number) => (
                  <tr
                    key={item?.id}
                    onClick={() => {
                      if (user?.email) {
                        setIsDetailData({
                          isDetail: true,
                          isLocation: "musicTable",
                        });
                        setMusicDetailData(item);
                      } else {
                        alert("로그인 후 이용해주세요.");
                      }
                    }}
                  >
                    <td>
                      <CheckBox
                        disabled={
                          myMusicPlayList?.find(
                            (i: MusicFormProps) => i?.id === item?.id
                          )
                            ? true
                            : false
                        }
                        onChange={() => {}}
                        onClick={async (e: any) => {
                          e.stopPropagation();
                          if (
                            myMusicPlayList?.find(
                              (i: MusicFormProps) => i?.id === item?.id
                            )
                              ? true
                              : false
                          ) {
                            return;
                          } else {
                            await onCheckedMusic(item?.id);
                            await setMusicDetailData(item);
                          }
                        }}
                        checked={
                          addMusicPlayer?.find((id: any) => id === item.id)
                            ? true
                            : false
                        }
                      ></CheckBox>
                    </td>
                    <td>{idx + 1}</td>
                    <td>
                      <img src={item?.img} alt="" />
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.singer}</td>
                    <td>{item?.genre}</td>
                    <td>{item?.likeCount}</td>
                    <td>{item?.downloadCount}</td>
                    <td>{item?.email?.split("@")[0]}</td>
                    <td>{item?.date?.substr(0, 10)}</td>
                  </tr>
                ))
            ) : (
              <p className="no-data">데이터가 없습니다.</p>
            )}
          </Tabel>

          <Pagination
            total={musicList?.length}
            limit={limit}
            page={page}
            setPage={setPage}
            handleChangePage={handleChangePage}
          />
        </div>
      </MusicTableContainer>
      {isDetailData?.isDetail &&
        isDetailData?.isLocation === "musicTable" &&
        user?.email && <MusicDetail detailData={musicDetailData}></MusicDetail>}
    </>
  );
};

export default MusicTable;
