import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Main from "common/layout/Main";
import { userInfo } from "components/Login/state";
import { collection, getDocs } from "firebase/firestore";
import Home from "pages/Home";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth, firestore } from "service/firebase";

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);
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
        return setUser(doc?.data()?.userInfo[0]);
      }
    });
  };
  console.log("auth", auth);
  console.log("user", user);
  useEffect(() => {
    getUserInfo();
  }, []);

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
