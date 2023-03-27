import { HomeContainer } from "./style";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import {
  isMusicDetailState,
  musicDetailState,
} from "components/MusicDetail/state";
import { useQueryClient } from "react-query";
import { myMusicPlayListState } from "pages/MyPage/state";

const Home = () => {
  const queryClient = useQueryClient();
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);
  //* QUERY 작업중
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const offset = (page - 1) * limit;

  // page
  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  return (
    <HomeContainer>
      {/* <div className="tabel-container">
        <Tabel
          tableBtnText={"인기순"}
          theadData={[
            {
              title: "순위",
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
              title: <SVG src="/svg/heart.svg" />,
            },
            {
              title: <SVG src="/svg/download.svg" />,
            },
          ]}
        >
          {musicList?.length !== 0 &&
            musicList
              ?.slice(offset, offset + limit)
              ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
              ?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => {
                    !user?.email
                      ? alert("로그인 후 이용해주세요")
                      : setIsDetailData({
                          isDetail: true,
                          isLocation: "home",
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
                  <td>{item?.likeCount}</td>
                  <td>{item?.downloadCount}</td>
                </tr>
              ))}
        </Tabel>
        {(musicList?.length === 0 || musicList === undefined) && (
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
          tableBtnText={"등록순"}
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
              title: <SVG src="/svg/heart.svg" />,
            },
            {
              title: <SVG src="/svg/download.svg" />,
            },
          ]}
        >
          {musicList?.length !== 0 &&
            musicList
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
                          isLocation: "home",
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
                  <td>{item?.likeCount}</td>
                  <td>{item?.downloadCount}</td>
                </tr>
              ))}
        </Tabel>
        {(musicList?.length === 0 || musicList === undefined) && (
          <p className="no-data">등록된 데이터가 없습니다.</p>
        )}
        <Pagination
          total={musicList?.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div> */}
    </HomeContainer>
  );
};

export default Home;
