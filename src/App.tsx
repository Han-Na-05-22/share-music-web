import Container from "common/layout/Container";
import Header from "common/layout/Header";
import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
