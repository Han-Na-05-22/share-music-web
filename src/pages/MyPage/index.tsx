import { checkEditMusicState, musicListState } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Pagination from "components/Pagination";
import Tabel from "components/Table";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MyPageContainer } from "./style";
import SVG from "react-inlinesvg";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import AddMusic from "components/AddMusic";
import { currentMusicState } from "components/Record/state";
import UserInfo from "components/UserInfo";
import { myMusicPlayListState } from "./state";
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";

// todo :내정보 비밀번호 변경, 마이플레이리스트 삭제 드래그 앤 드롭 기능

const MyPage = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);
  const [isEdit, setIsEdit] = useRecoilState<string>(checkEditMusicState);
  const [currentMusic, setCurrentMusic] =
    useRecoilState<any>(currentMusicState);
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [limit, setLimit] = useState<number>(11);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;
  const queryClient = useQueryClient();

  const { mutate: deleteMusic } = useMutation(
    () => musicApi?.deleteMusicData(musicDetailData),
    {
      onError: (error) => {
        console.log("error:", error);
        alert("삭제에 실패하였습니다.");
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries("getMusicAllDataList");
        alert("삭제가 완료되었습니다.");
      },
    }
  );

  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  return (
    <MyPageContainer>
      <UserInfo></UserInfo>
      <div className="tabel-container">
        <Tabel
          theadData={[
            {
              title: "순번",
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
              title: "",
            },
            {
              title: "",
            },
          ]}
        >
          {musicList?.filter((i: any) => i?.email === user?.email)?.length !==
            0 &&
            musicList
              ?.filter((i: any) => i?.email === user?.email)
              ?.slice(offset, offset + limit)
              ?.sort((a: any, b: any) => a?.date - b?.date)
              ?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "mypage",
                        });
                    setIsEdit("");
                    setMusicDetailData(item);
                  }}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>
                    <SVG
                      src="/svg/term_edit.svg"
                      onClick={async (e) => {
                        e.stopPropagation();
                        setCurrentMusic(item);
                        setIsDetailData({
                          isDetail: true,
                          isLocation: "clickedEdit",
                        });
                        setIsEdit("edit");
                      }}
                    />
                  </td>
                  <td>
                    <SVG
                      src="/svg/term_delete.svg"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await setMusicDetailData(item);
                        await deleteMusic(item);
                      }}
                    />
                  </td>
                </tr>
              ))}
        </Tabel>
        {(musicList?.filter((i: any) => i?.email === user?.email)?.length ===
          0 ||
          musicList === undefined) && (
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
      <div className="tabel-container">
        <Tabel
          theadData={[
            {
              title: "순번",
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
          ]}
        >
          {myMusicPlayList?.length !== 0 &&
            myMusicPlayList
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "mypage",
                        });
                    setMusicDetailData(item);
                  }}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                </tr>
              ))}
        </Tabel>
        {(myMusicPlayList?.length === 0 || musicList === undefined) && (
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
      {isDetailData?.isDetail &&
        isDetailData?.isLocation === "mypage" &&
        isEdit !== "edit" && (
          <MusicDetail detailData={musicDetailData}></MusicDetail>
        )}
      {isDetailData?.isLocation === "clickedEdit" && isEdit === "edit" && (
        <AddMusic></AddMusic>
      )}
    </MyPageContainer>
  );
};

export default MyPage;
