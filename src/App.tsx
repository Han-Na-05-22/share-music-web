import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Main from "common/layout/Main";
import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

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
