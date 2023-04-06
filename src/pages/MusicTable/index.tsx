import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import {
  addMusicPlayerState,
  filterMusicListState,
  searchFilterState,
  searchMusicListState,
  selectFilterState,
} from "./state";
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
import { navState } from "common/layout/Nav/state";

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
  const [searchFilter, setSearchFilter] =
    useRecoilState<boolean>(searchFilterState);
  const [addMusicPlayer, setAddMusicPlayer] =
    useRecoilState<any[]>(addMusicPlayerState);
  let myDownloadDataLength: any[] = [];
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<MusicFormProps[]>(myMusicPlayListState);
  const offset = (page - 1) * limit;
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [navData, setNavData] = useRecoilState<any[]>(navState);
  const [searchMusicList, setSearchMusicList] =
    useRecoilState<MusicFormProps[]>(searchMusicListState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<MusicFormProps>(musicDetailState);
  const quertyClient = useQueryClient();
  const { mutate: updateMusicDownloadAllCount } = useMutation(
    () =>
      musicApi?.updateMusicCountData(
        "download-all",
        musicList,
        addMusicPlayer,
        user,
      ),
    {
      onError: (error) => {
        console.log("error:", error);
      },
      onSuccess: async () => {
        await quertyClient.invalidateQueries("getMusicAllDataList");
      },
    },
  );
  const getMusicList: MusicFormProps[] = searchFilter
    ? searchMusicList
    : filterMusicList?.map((i: any) => i);

  const onCheckedAllMusic = () => {
    let array: any = "";
    if (
      addMusicPlayer?.length !== 0 &&
      getMusicList?.slice(offset, offset + limit)?.length ===
        addMusicPlayer?.length +
          getMusicList
            ?.slice(offset, offset + limit)
            ?.filter((i: MusicFormProps) => i?.email === user?.email)?.length +
          myDownloadDataLength?.length
    ) {
      setAddMusicPlayer([]);
    } else {
      getMusicList
        ?.slice(offset, offset + limit)
        ?.forEach((i: MusicFormProps) => {
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
            addMusicPlayer?.filter((item: number) => item !== id),
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
    getMusicList[0]?.email === "" ||
    selectFilter === "MyMusic" ||
    selectFilter === "Playlist" ||
    myMusicPlayList?.filter((i: any) => i?.genre === selectFilter)?.length ===
      getMusicList?.length ||
    musicList?.length === myMusicPlayList?.length;

  const getMyDownloadData = () => {
    if (getMusicList?.length !== 0) {
      getMusicList
        ?.slice(offset, offset + limit)
        ?.filter((i: MusicFormProps) => i?.email !== user?.email)
        ?.map((a: any) =>
          a?.downloadClickList?.filter((b: any) => {
            if (b?.email === user?.email) {
              return (myDownloadDataLength = [
                ...myDownloadDataLength,
                {
                  id: a?.id,
                  b: b?.email,
                },
              ]);
            }
          }),
        );
    }
  };

  useEffect(() => {
    if (searchFilter) {
      return;
    }

    if (
      selectFilter === "MyMusic" &&
      musicList[0]?.email !== "" &&
      !searchFilter
    ) {
      const result = musicList?.filter(
        (item: MusicFormProps) => item?.email === user?.email,
      );

      setFilterMusicList(result);
    }

    if (selectFilter === "Playlist" && !searchFilter) {
      setFilterMusicList(myMusicPlayList);
    }

    if (selectFilter === "New" && !searchFilter) {
      const result = musicList
        ?.map((item: MusicFormProps) => item)
        ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.date - a?.date);

      setFilterMusicList(result);
    }

    if (selectFilter === "Popular" && !searchFilter) {
      const result = musicList
        ?.map((item: MusicFormProps) => item)
        ?.sort(
          (a: MusicFormProps, b: MusicFormProps) => b?.likeCount - a?.likeCount,
        );

      setFilterMusicList(result);
    }
  }, [selectFilter, musicList, myMusicPlayList, searchFilter]);

  getMyDownloadData();

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
              getMusicList[0]?.email === "" || getMusicList?.length === 0
                ? "no-tabel-data"
                : ""
            }
            theadData={[
              {
                title: (
                  <CheckBox
                    disabled={
                      getMusicList[0]?.email === "" ||
                      selectFilter === "MyMusic" ||
                      selectFilter === "Playlist" ||
                      getMusicList?.slice(offset, offset + limit)?.length ===
                        getMusicList
                          ?.slice(offset, offset + limit)
                          ?.filter(
                            (i: MusicFormProps) => i?.email === user?.email,
                          )?.length +
                          myDownloadDataLength?.length
                    }
                    onClick={(
                      e: React.MouseEvent<HTMLTableCaptionElement, MouseEvent>,
                    ) => {
                      e.stopPropagation();

                      if (!allCheckd) {
                        onCheckedAllMusic();
                      }
                    }}
                    onChange={() => {}}
                    checked={
                      getMusicList?.slice(offset, offset + limit)?.length ===
                        addMusicPlayer?.length +
                          getMusicList
                            ?.slice(offset, offset + limit)
                            ?.filter(
                              (i: MusicFormProps) => i?.email === user?.email,
                            )?.length +
                          myDownloadDataLength?.length &&
                      getMusicList?.slice(offset, offset + limit)?.length !==
                        getMusicList
                          ?.slice(offset, offset + limit)
                          ?.filter(
                            (i: MusicFormProps) => i?.email === user?.email,
                          )?.length +
                          myDownloadDataLength?.length
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
            {(getMusicList[0]?.email !== "" &&
              getMusicList[0]?.title !== undefined) ||
            getMusicList?.length !== 0 ? (
              getMusicList
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
                            (i: MusicFormProps) => i?.id === item?.id,
                          )
                            ? true
                            : false
                        }
                        onChange={() => {}}
                        onClick={async (
                          e: React.MouseEvent<
                            HTMLTableCaptionElement,
                            MouseEvent
                          >,
                        ) => {
                          e.stopPropagation();
                          if (
                            myMusicPlayList?.find(
                              (i: MusicFormProps) => i?.id === item?.id,
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
                    <td>{page === 1 ? idx + 1 : idx + 1 + (page - 1) * 15}</td>
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
            total={getMusicList?.length}
            limit={limit}
            page={page}
            setPage={setPage}
            onCheckedBtn={() => setAddMusicPlayer([])}
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
