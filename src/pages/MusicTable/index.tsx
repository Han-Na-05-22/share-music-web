import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useCallback, useEffect, useState } from "react";
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
import { loginState, userInfo } from "components/Login/state";
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";
import { LoginStateProps, UserProps } from "components/Login/interface";
import {
  MusicCountListProps,
  MusicFormProps,
} from "components/AddMusic/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";
import { navState } from "common/layout/Nav/state";
import { toastMsg } from "utility/toastMsg";

const MusicTable = () => {
  const [loginStateDate, setLoginStateDate] =
    useRecoilState<LoginStateProps>(loginState);

  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);

  // 필터링된 음악리스트
  const [filterMusicList, setFilterMusicList] =
    useRecoilState<MusicFormProps[]>(filterMusicListState);
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [searchFilter, setSearchFilter] =
    useRecoilState<boolean>(searchFilterState);
  const [addMusicPlayer, setAddMusicPlayer] =
    useRecoilState<any[]>(addMusicPlayerState);

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

  // 나의 플레이리스트에 다른 유저의 음원 추가
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

  // 체크박스 전체 체크
  const onCheckedAllMusic = () => {
    let array: any = "";
    if (!allCheckd) {
      if (
        addMusicPlayer?.length !== 0 &&
        getMusicList?.slice(offset, offset + limit)?.length ===
          addMusicPlayer?.length + myMusicPlayListLength
      ) {
        setAddMusicPlayer([]);
      } else {
        getMusicList
          ?.slice(offset, offset + limit)
          ?.forEach((i: MusicFormProps) => {
            if (
              !myMusicPlayList
                ?.map((j: MusicFormProps) => j?.id)
                ?.includes(i?.id)
            ) {
              array = [...array, i?.id];
            }
            setAddMusicPlayer(array);
          });
      }
    }
  };

  // 체크박스 개별 체크
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
    if (getMusicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  const myMusicPlayListLength: number = getMusicList
    ?.slice(offset, offset + limit)
    ?.map((i: MusicFormProps) => {
      let isDownload = false;
      i?.downloadClickList?.filter((a: MusicCountListProps) => {
        if (a?.email === user?.email) {
          return (isDownload = true);
        } else {
          return isDownload;
        }
      });

      if (isDownload || i?.email === user?.email) {
        return {
          ...i,
        };
      }
    })
    ?.filter((i: any) => i !== undefined)?.length;

  const allCheckd =
    getMusicList[0]?.email === "" ||
    selectFilter === "MyMusic" ||
    selectFilter === "Playlist" ||
    myMusicPlayList?.filter((i: any) => i?.genre === selectFilter)?.length ===
      getMusicList?.length ||
    musicList?.length ===
      myMusicPlayList?.filter((i: any) => i !== undefined)?.length ||
    myMusicPlayListLength ===
      getMusicList?.slice(offset, offset + limit)?.length;

  useEffect(() => {
    if (searchFilter) {
      return;
    }

    // 클릭한 메뉴에 맞게 filterMusicList에 음악리스트를 담음(인기순, 최신순, 내가 등록한 음악, 내 플레이리스트  음악)
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
      setFilterMusicList(myMusicPlayList?.filter((i: any) => i !== undefined));
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

  useEffect(() => {
    setPage(1);
  }, [navData]);

  // useEffect(() => {
  //   setMyMusicPlayList(myMusicPlayList?.filter((i: any) => i !== undefined));
  // }, []);

  return (
    <>
      <MusicTableContainer>
        <Button
          className="my-info-submit"
          fontSize="16px"
          btnType={user?.email ? "submit" : "none"}
          onClick={async () => {
            if (addMusicPlayer?.length === 0) {
              toastMsg("add", "failure");
            } else {
              await updateMusicDownloadAllCount();
              toastMsg("add", "success");
              setAddMusicPlayer([]);
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
                        myMusicPlayListLength
                    }
                    onClick={(
                      e: React.MouseEvent<HTMLTableCaptionElement, MouseEvent>,
                    ) => {
                      if (allCheckd) {
                        e.stopPropagation();
                        e.preventDefault();
                      }

                      if (!allCheckd) {
                        onCheckedAllMusic();
                      }
                    }}
                    onChange={() => {}}
                    checked={
                      getMusicList?.slice(offset, offset + limit)?.length ===
                      addMusicPlayer?.length + myMusicPlayListLength
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
            {getMusicList?.length !== 0 &&
            getMusicList[0]?.email !== undefined ? (
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
                        setLoginStateDate({
                          ...loginStateDate,
                          isLogin: true,
                        });
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
              <p className="no-data">
                {!user?.email
                  ? "로그인 후 이용해주세요."
                  : "데이터가 없습니다."}
              </p>
            )}
          </Tabel>
          {getMusicList?.length !== 0 &&
            getMusicList[0]?.email !== undefined && (
              <Pagination
                total={getMusicList?.length}
                limit={limit}
                page={page}
                setPage={setPage}
                onCheckedBtn={() => setAddMusicPlayer([])}
                handleChangePage={handleChangePage}
              />
            )}
        </div>
      </MusicTableContainer>
      {isDetailData?.isDetail &&
        isDetailData?.isLocation === "musicTable" &&
        user?.email && <MusicDetail detailData={musicDetailData}></MusicDetail>}
    </>
  );
};

export default MusicTable;
