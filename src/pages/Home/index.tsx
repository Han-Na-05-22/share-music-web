import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Tabel from "components/Table";

const Home = () => {
  const [test, setTest] = useState<string>("test");
  const [tdContent, setTdContent] = useState<any[]>([
    {
      a: "순위",
      b: "음원",
      c: "제목",
      d: "가수",
      e: <SVG src="/svg/heart.svg" />,
      f: <SVG src="/svg/download.svg" />,
    },
    {
      a: "순위",
      b: "음원",
      c: "제목",
      d: "가수",
      e: <SVG src="/svg/heart.svg" />,
      f: <SVG src="/svg/download.svg" />,
    },
  ]);

  return (
    <HomeContainer>
      {/* <Box>Box</Box>
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
      </div> */}
      {/* <Modal>등록이 완료 되었습니다.</Modal> */}
      <Tabel
        theadData={[
          {
            title: "순위",
          },
          {
            title: "음원",
          },
          {
            title: "제목",
          },
          {
            title: "가수",
          },
          {
            title: <SVG src="/svg/heart.svg" />,
          },
          {
            title: <SVG src="/svg/download.svg" />,
          },
        ]}
      >
        {tdContent?.map((item: any, idx: number) => (
          <tr key={idx}>
            <td>{item?.a}</td>
            <td>{item?.b}</td>
            <td>{item?.c}</td>
            <td>{item?.d}</td>
            <td>{item?.e}</td>
            <td>{item?.f}</td>
          </tr>
        ))}
      </Tabel>
    </HomeContainer>
  );
};

export default Home;
