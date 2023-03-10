import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import { useState } from "react";
import Tabel from "components/Table";
import Pagination from "components/Pagination";
import { dummyData } from "utility/data";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import {
  isMusicDetailState,
  musicDetailState,
  musicDetailUrlState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import * as functions from "../../common/functions";
import LeftContent from "common/layout/LeftContent";

// todo : 좋아요 및 플레이리스트 svg 다시 클릭 시 데이터 삭제 기능(완료) 정도만 구현하면 대부분 완성! (이미지 용량!!)

const Home = () => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);

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
      <LeftContent className="left-container"></LeftContent>
      <div className="tabel-container">
        <Tabel
          tableBtnText={"TOP"}
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
          {musicList?.length !== undefined ? (
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
                    functions.getMusicUrlFunction(
                      item?.email,
                      setMusicDetailUrl,
                      item?.mp3
                    );
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
      <div className="tabel-container">
        <Tabel
          tableBtnText={"NEW"}
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
          {musicList?.length !== undefined ? (
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
                    functions.getMusicUrlFunction(
                      item?.email,
                      setMusicDetailUrl,
                      item?.mp3
                    );
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

      {isDetailData?.isDetail && isDetailData?.isLocation === "home" && (
        <MusicDetail detailData={musicDetailData}></MusicDetail>
      )}
    </HomeContainer>
  );
};

export default Home;
