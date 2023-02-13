import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";

const Home = () => {
  const [test, setTest] = useState<string>("test");

  return (
    <HomeContainer>
      <Box>Box</Box>
      <div className="input-test">
        <TextInput
          name="test"
          value={test}
          label="음원"
          isError={true}
          errorMsg="에러 메시지 입니다."
        ></TextInput>
        <Button marginLeft="15px" btnType="submit">
          업로드
        </Button>
      </div>
      <Modal></Modal>
    </HomeContainer>
  );
};

export default Home;
