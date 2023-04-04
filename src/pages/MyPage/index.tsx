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
import { useMutation, useQueryClient } from "react-query";
import { musicApi } from "common/api/music";
import { UserProps } from "components/Login/interface";
import { MusicFormProps } from "components/AddMusic/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";

const MyPage = () => {
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [isEdit, setIsEdit] = useRecoilState<string>(checkEditMusicState);
  const [currentMusic, setCurrentMusic] =
    useRecoilState<MusicFormProps>(currentMusicState);
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [limit, setLimit] = useState<number>(10);
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
      <UserInfo className="user-info-container"></UserInfo>
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
