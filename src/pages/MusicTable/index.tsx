import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { selectFilterState } from "./state";
import CheckBox from "components/CheckBox";
import TextInput from "components/TextInput";
import Button from "components/Button";
import {
  isMusicDetailState,
  musicDetailState,
  musicDetailUrlState,
} from "components/MusicDetail/state";
import * as functions from "../../common/functions";
import MusicDetail from "components/MusicDetail";
import { myMusicPlayListState } from "pages/MyPage/state";
import { userInfo } from "components/Login/state";

const MusicTable = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [search, setSearch] = useState<any>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const [addMusicPlayer, setAddMusicPlayer] = useState<any[]>([]);

  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);
  const offset = (page - 1) * limit;
  console.log("selectFilter", selectFilter);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);

  const onCheckedAllMusic = () => {
    if (
      (addMusicPlayer?.length !== 0 &&
        addMusicPlayer?.length + myMusicPlayList?.length ===
          musicList?.length) ||
      (addMusicPlayer?.length !== 0 &&
        addMusicPlayer?.length + myMusicPlayList?.length ===
          musicList?.length + myMusicPlayList?.length)
    ) {
      setAddMusicPlayer([]);
    } else {
      const result = musicList?.map((item: any, i: number) => item.id);
      setAddMusicPlayer(result);
    }
  };

  const onCheckedMusic = (id: number) => {
    if (addMusicPlayer?.length === 0) {
      setAddMusicPlayer([id]);
    } else {
      addMusicPlayer?.includes(id)
        ? setAddMusicPlayer(addMusicPlayer.filter((item: any) => item !== id))
        : setAddMusicPlayer((prev: any) => [...prev, id]);
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

  useEffect(() => {
    if (selectFilter !== "TOP" && selectFilter !== "NEW") {
      const result = musicList?.filter(
        (item: any) => item?.genre === selectFilter
      );
      console.log("result", result);
      setMusicList(result);
    }
  }, [selectFilter]);
  console.log("musicList", musicList);
  return (
    <MusicTableContainer>
      <div className="music-top">
        <div className="search">
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
            onClick={() => {
              if (search?.length === 0) {
                functions.getMusicListDataFunction(setMusicList);
              } else {
                setMusicList(
                  musicList?.filter((i: any) => i?.title === search)
                );
              }
            }}
          >
            검색
          </Button>
        </div>

        <Button
          className="my-info-submit"
          fontSize="16px"
          btnType="submit"
          onClick={() => {}}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckedAllMusic();
                  }}
                  onChange={() => {}}
                  checked={
                    addMusicPlayer?.length + myMusicPlayList?.length ===
                      musicList?.length ||
                    addMusicPlayer?.length + myMusicPlayList?.length ===
                      musicList?.length + myMusicPlayList?.length
                      ? true
                      : false
                  }
                ></CheckBox>
              ),
            },
            {
              title: selectFilter === "TOP" ? "순위" : "순번",
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
            {
              title: "",
            },
          ]}
        >
          {musicList?.length !== undefined && musicList?.length !== 0 ? (
            musicList
              ?.slice(offset, offset + limit)
              ?.sort((a: any, b: any) => {
                if (selectFilter === "TOP") {
                  return b?.likeCount - a?.likeCount;
                } else {
                  return b?.id - a?.id;
                }
              })
              ?.map((item: any, idx: number) => (
                <tr
                  key={item?.id}
                  onClick={(event: any) => {
                    setIsDetailData({
                      isDetail: true,
                      isLocation: "musicTable",
                    });
                    setMusicDetailData(item);
                    functions.getMusicUrlFunction(
                      item?.email,
                      setMusicDetailUrl,
                      item?.mp3
                    );
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
                        onCheckedMusic(item?.id);
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
                  <td>
                    <SVG
                      src="/svg/term_heart.svg"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={
                        item?.likedClickList?.find(
                          (i: any) => i?.email === user?.email
                        )
                          ? "clicked-svg"
                          : "no-clicked-svg"
                      }
                    />
                  </td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
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
      {isDetailData?.isDetail && isDetailData?.isLocation === "musicTable" && (
        <MusicDetail detailData={musicDetailData}></MusicDetail>
      )}
    </MusicTableContainer>
  );
};

export default MusicTable;
