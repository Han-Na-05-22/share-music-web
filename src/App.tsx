import Container from "common/layout/Container";
import Header from "common/layout/Header";
import { musicListState, myMusic } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Home from "pages/Home";
import MusicTable from "pages/MusicTable";
import MyPage from "pages/MyPage";
import { myMusicPlayListState } from "pages/MyPage/state";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as functions from "./common/functions";

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);

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
    functions.getUserDataFunction(setUser);
    functions.getMusicListDataFunction(setMusicList);
  }, []);

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
      </Container>
    </div>
  );
}

export default App;
