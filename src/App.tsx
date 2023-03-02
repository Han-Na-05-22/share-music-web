import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Main from "common/layout/Main";
import { userInfo } from "components/Login/state";
import Home from "pages/Home";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";

// todo : 세션스토리지에 토큰 정보가 저장되어 있을 시 자동으로 로그인 될 수 있게 구현(완)

function App() {
  const [user, setUser] = useRecoilState<any>(userInfo);

  useEffect(() => {
    const getUserInfo: any = sessionStorage?.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    );

    if (getUserInfo) {
      setUser(JSON.parse(getUserInfo));
    }
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
