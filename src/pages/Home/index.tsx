import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useState } from "react";

const Home = () => {
  const [test, setTest] = useState<string>("test");

  return (
    <HomeContainer>
      <Box>Box</Box>
      <TextInput name="test" value={test} label="음원"></TextInput>
    </HomeContainer>
  );
};

export default Home;
