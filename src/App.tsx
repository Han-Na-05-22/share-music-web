import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Main from "common/layout/Main";
import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

// todo : 로컬스토리지에 토큰 정보가 저장되어 있을 시 자동으로 로그인 될 수 있게 구현
function App() {
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
