import Container from "common/layout/Container";
import Header from "common/layout/Header";
import { musicListState, myMusic } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import { collection, getDocs } from "firebase/firestore";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import NotFound from "pages/NotFound";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, firestore } from "service/firebase";
import * as functions from "./common/functions";

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);

  console.log("auth", auth);
  console.log("user", user);
  console.log("myMusicList", myMusicList);
  console.log("musicList", musicList);
  useEffect(() => {
    functions.getUserDataFunction(setUser);
    functions.getMusicListDataFunction(setMusicList);
  }, []);

  // todo : 삭제 예정
  // useEffect(() => {
  //   if (user?.email) {
  //     setMyMusicList(
  //       functions?.myMusicListFunction(`music/${user?.email}/`, setMyMusicList)
  //     );
  //   }
  // }, [user]);
  return (
    <div className="App">
      <Container>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
