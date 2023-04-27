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
import { toastMsg } from "utility/toastMsg";

const MyPage = () => {
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<MusicFormProps>(musicDetailState);
  const [isEdit, setIsEdit] = useRecoilState<string>(checkEditMusicState);

  // 내가 수정할 음악 데이터 정보
  const [currentMusic, setCurrentMusic] =
    useRecoilState<MusicFormProps>(currentMusicState);
  const [user, setUser] = useRecoilState<UserProps>(userInfo);

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;
  const queryClient = useQueryClient();

  // 내가 등록한 음악 삭제
  const { mutate: deleteMusic } = useMutation(
    () => musicApi?.deleteMusicData(musicDetailData),
    {
      onError: async (error) => {
        toastMsg("delete", "failure");
        console.log("error:", error);
      },

      onSuccess: async () => {
        toastMsg("delete", "success");
        queryClient.invalidateQueries("getMusicAllDataList");

        setTimeout(() => {
          queryClient.invalidateQueries("getMusicAllDataList");
        }, 2000);
      },
    },
  );

  const handleChangePage = (page: number) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  return (
    <MyPageContainer>
      {/* UserInfo 컴포넌트에 내정보 수정 기능까지 함께 구현함 */}
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
          {musicList?.filter((i: MusicFormProps) => i?.email === user?.email)
            ?.length !== 0 &&
            musicList
              ?.filter((i: MusicFormProps) => i?.email === user?.email)
              ?.slice(offset, offset + limit)
              ?.sort(
                (a: MusicFormProps, b: MusicFormProps) => a?.date - b?.date,
              )
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
                  <td>{page === 1 ? idx + 1 : idx + 1 + (page - 1) * 10}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>
                    <SVG
                      src="/svg/term_edit.svg"
                      onClick={async (
                        e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
                      ) => {
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
                      onClick={async (
                        e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
                      ) => {
                        e.stopPropagation();
                        await setMusicDetailData(item);
                        await deleteMusic(item);
                      }}
                    />
                  </td>
                </tr>
              ))}
        </Tabel>
        {(musicList?.filter((i: MusicFormProps) => i?.email === user?.email)
          ?.length === 0 ||
          musicList === undefined) && (
          <p className="no-data">등록된 데이터가 없습니다.</p>
        )}
        <Pagination
          total={
            musicList?.filter((i: MusicFormProps) => i?.email === user?.email)
              ?.length
          }
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
