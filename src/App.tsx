import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Main from "common/layout/Main";
import { myMusic } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import { collection, getDocs } from "firebase/firestore";
import Home from "pages/Home";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, firestore } from "service/firebase";
import * as functions from "./common/functions";
function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);

  const getUserInfo = async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    const getUserInfo: any = sessionStorage?.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    );
    querySnapshot?.forEach((doc: any) => {
      if (
        doc?.id === auth?.currentUser?.uid.replace('"', "") ||
        doc?.id === getUserInfo?.uid
      ) {
        return setUser(doc?.data()?.userInfo);
      }
    });
  };
  console.log("auth", auth);
  console.log("user", user);
  console.log("myMusicList", myMusicList);
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user?.email) {
      setMyMusicList(
        functions?.myMusicListFunction(`music/${user?.email}/`, setMyMusicList)
      );
    }
  }, [user]);
  return (
    <div className="App">
      <Container>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Main>
      </Container>
    </div>
  );
}

export default App;
