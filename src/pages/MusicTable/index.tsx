import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { filterMusicListState, selectFilterState } from "./state";
import CheckBox from "components/CheckBox";
import TextInput from "components/TextInput";
import Button from "components/Button";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import { myMusicPlayListState } from "pages/MyPage/state";
import { userInfo } from "components/Login/state";
import { GenreListAll } from "utility/data";
import BasicSelect from "components/BasicSelect";
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";

const MusicTable = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [filterMusicList, setFilterMusicList] =
    useRecoilState<any>(filterMusicListState);
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [search, setSearch] = useState<any>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [addMusicPlayer, setAddMusicPlayer] = useState<any[]>([]);
  const [filterGenre, setFilterGenre] = useState<string>("All");

  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);
  const offset = (page - 1) * limit;

  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
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
          myMusicPlayList?.filter((i: any) => i?.genre === selectFilter)
            ?.length ===
          filterMusicList?.length) ||
      (addMusicPlayer?.length !== 0 &&
        addMusicPlayer?.length + myMusicPlayList?.length ===
          filterMusicList?.length)
    ) {
      setAddMusicPlayer([]);
    } else {
      filterMusicList?.forEach((i: any) => {
        if (!myMusicPlayList?.map((j: any) => j?.id)?.includes(i?.id)) {
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
        ? setAddMusicPlayer(addMusicPlayer?.filter((item: any) => item !== id))
        : setAddMusicPlayer((prev: any) => [...prev, id]);
    }
  };

  const handleChangeSelect = async (isSelected?: any) => {
    if (search?.length === 0 && isSelected === "All") {
      setFilterMusicList(musicList);
    }
    if (search?.length === 0 && isSelected !== "All") {
      setFilterMusicList(
        musicList?.filter((i: any) => i?.genre === isSelected)
      );
    }

    if (search?.length !== 0 && isSelected === "All") {
      setFilterMusicList(musicList?.filter((i: any) => i?.title === search));
    }

    if (search?.length !== 0 && isSelected !== "All") {
      setFilterMusicList(
        musicList?.filter(
          (i: any) => i?.title === search && i?.genre === isSelected
        )
      );
    }
  };

  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  const allCheckd =
    filterMusicList?.length === 0 ||
    selectFilter === "내 음악" ||
    selectFilter === "플레이리스트" ||
    myMusicPlayList?.filter((i: any) => i?.genre === selectFilter)?.length ===
      filterMusicList?.length ||
    musicList?.length === myMusicPlayList?.length;

  useEffect(() => {
    if (selectFilter !== "인기순" && selectFilter !== "등록순") {
      const result = musicList?.filter(
        (item: any) => item?.genre === selectFilter
      );
      setFilterMusicList(result);
    }

    if (selectFilter === "내 음악") {
      const result = musicList?.filter(
        (item: any) => item?.email === user?.email
      );
      setFilterMusicList(result);
    }

    if (selectFilter === "플레이리스트") {
      setFilterMusicList(myMusicPlayList);
    }

    if (selectFilter === "인기순" || selectFilter === "등록순") {
      const result = musicList?.filter((item: any) => item);

      setFilterMusicList(result);
    }
  }, [selectFilter, musicList]);

  return (
    <MusicTableContainer>
      <div className="music-top">
        <div className="search">
          {!GenreListAll?.find((i: any) => i?.name === selectFilter) && (
            <BasicSelect
              selectData={GenreListAll}
              name="genre"
              value={filterGenre}
              onChange={async (event: any) => {
                await setFilterGenre(
                  event.target.options[event.target.selectedIndex].value
                );
                handleChangeSelect(
                  event.target.options[event.target.selectedIndex].value
                );
              }}
            ></BasicSelect>
          )}

          <TextInput
            width="220px"
            name="search"
            value={search}
            placeholder="노래 제목을 입력해주세요."
            onChange={(e: any) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            label=""
          ></TextInput>
          <Button
            fontSize="18px"
            className="my-info-submit"
            btnType="submit"
            onClick={(e) => {
              handleChangeSelect(filterGenre);
            }}
          >
            검색
          </Button>
        </div>

        <Button
          className="my-info-submit"
          fontSize="16px"
          btnType="submit"
          onClick={async () => {
            await updateMusicDownloadAllCount();
            alert("추가되었습니다.");
          }}
        >
          플레이리스트 추가
        </Button>
      </div>
      <div className="tabel-container">
        <Tabel
          tableBtnText={selectFilter}
          theadData={[
            {
              title: (
                <CheckBox
                  disabled={
                    filterMusicList?.length === 0 ||
                    selectFilter === "내 음악" ||
                    selectFilter === "플레이리스트" ||
                    myMusicPlayList?.filter(
                      (i: any) => i?.genre === selectFilter
                    )?.length === filterMusicList?.length ||
                    musicList?.length === myMusicPlayList?.length
                  }
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!allCheckd) {
                      onCheckedAllMusic();
                    }
                  }}
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
              title: selectFilter === "인기순" ? "순위" : "순번",
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
          {filterMusicList?.length !== 0 &&
            filterMusicList
              ?.slice(offset, offset + limit)
              ?.sort((a: any, b: any) => {
                if (selectFilter === "인기순") {
                  return b?.likeCount - a?.likeCount;
                } else {
                  return b?.id - a?.id;
                }
              })
              ?.map((item: any, idx: number) => (
                <tr
                  key={item?.id}
                  onClick={() => {
                    setIsDetailData({
                      isDetail: true,
                      isLocation: "musicTable",
                    });
                    setMusicDetailData(item);
                  }}
                >
                  <td>
                    <CheckBox
                      disabled={
                        myMusicPlayList?.find((i: any) => i?.id === item?.id)
                          ? true
                          : false
                      }
                      onClick={async (e: any) => {
                        e.stopPropagation();
                        if (
                          myMusicPlayList?.find((i: any) => i?.id === item?.id)
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
                  <td>{item?.date}</td>
                </tr>
              ))}
        </Tabel>
        {filterMusicList?.length === 0 && (
          <p className="no-data">등록된 데이터가 없습니다.</p>
        )}

        <Pagination
          total={musicList?.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
      {isDetailData?.isDetail && isDetailData?.isLocation === "musicTable" && (
        <MusicDetail detailData={musicDetailData}></MusicDetail>
      )}
    </MusicTableContainer>
  );
};

export default MusicTable;
