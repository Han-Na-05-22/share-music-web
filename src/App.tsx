import Container from "common/layout/Container";
import Header from "common/layout/Header";
import { musicListState } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Home from "pages/Home";
import MusicTable from "pages/MusicTable";
import MyPage from "pages/MyPage";
import { myMusicPlayListState } from "pages/MyPage/state";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { useQuery } from "react-query";
import { userApi } from "common/api/user";
import { musicApi } from "common/api/music";
import PlayList from "components/PlayList";
import { isMusicDetailState } from "components/MusicDetail/state";
import Overlay from "components/Overlay";

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);

  const { isLoading: getUserListLoading, data: UserAllList } = useQuery<any>(
    "getUserAllList",
    userApi?.getUserAllDataList()
  );

  const { isLoading: userDataLoading, data: userData } = useQuery<any>(
    "getUser",
    () => {
      return JSON.parse(sessionStorage.getItem("user") || "{}");
    }
  );

  const { isLoading: musicAllListDataLoading, data: musicAllListData } =
    useQuery<any>("getMusicAllDataList", musicApi?.getMusicAllDataList());

  let getDownloadMusicList: any = "";
  const getDownloadMusicData = () => {
    musicList
      ?.filter((item: any) => item?.email !== user?.email)
      ?.map((i: any) => {
        i?.downloadClickList?.filter((a: any) => {
          if (a?.email === user?.email) {
            return (getDownloadMusicList = [...getDownloadMusicList, i]);
          }
        });
      });
  };

  useEffect(() => {
    if (auth?.currentUser !== null || userData) {
      setUser(
        UserAllList?.find(
          (i: any) => i?.email === (auth?.currentUser?.email || userData?.email)
        )
      );
    }
  }, [UserAllList, userData]);

  useEffect(() => {
    if (musicAllListData) {
      setMusicList(musicAllListData);
    }
  }, [musicAllListData]);

  useEffect(() => {
    getDownloadMusicData();

    if (getDownloadMusicList) {
      setMyMusicPlayList(
        getDownloadMusicList?.concat(
          musicList?.filter((item: any) => item?.email === user?.email)
        )
      );
    } else {
      setMyMusicPlayList(
        musicList?.filter((item: any) => item?.email === user?.email)
      );
    }
  }, [musicList]);

  return (
    <div className="App">
      <Container>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/musicTable" element={<MusicTable />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <PlayList
          className={
            isDetailData?.isLocation === "playList" ? "detail-play-list" : ""
          }
          onClick={() => {
            setIsDetailData({
              isDetail: true,
              isLocation: "playList",
            });
          }}
          playListData={myMusicPlayList}
        ></PlayList>
      </Container>
    </div>
  );
}

export default App;
