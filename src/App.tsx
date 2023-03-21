import Container from "common/layout/Container";
import Header from "common/layout/Header";
import { musicListState } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Home from "pages/Home";
import MusicTable from "pages/MusicTable";
import MyPage from "pages/MyPage";
import { myMusicPlayListState } from "pages/MyPage/state";
import NotFound from "pages/NotFound";
import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as functions from "./common/functions";
import { useQuery } from "react-query";

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);

  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  console.log("musicList", musicList);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);
  console.log("myMusicPlayList", myMusicPlayList);
  let getDownloadMusicList: any = "";
  const getDownloadMusicData = useCallback(() => {
    musicList
      ?.filter((item: any) => item?.email !== user?.email)
      ?.map((i: any) => {
        i?.downloadClickList?.filter((a: any) => {
          if (a?.email === user?.email) {
            return (getDownloadMusicList = [...getDownloadMusicList, i]);
          }
        });
      });
  }, [musicList]);

  const { isLoading, error, data, refetch } = useQuery<any>(
    "getFirestoreMusicListDataList",
    () => {
      functions?.getMusicListDataFunction(setMusicList);
    }
  );

  useEffect(() => {
    functions?.getUserDataFunction(setUser);
  }, []);

  getDownloadMusicData();
  useEffect(() => {
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
      </Container>
    </div>
  );
}

export default App;
