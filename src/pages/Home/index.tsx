import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Tabel from "components/Table";
import Textarea from "components/Textarea";
import ImgUpload from "components/ImgUpload";

const Home = () => {
  const [test, setTest] = useState<any>({
    title: "",
    content: "",
    img: "",
  });
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
  console.log("test", test);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setTest({ ...test, [name]: fr.result, formDataImg: formData });
        }
      };
    }
  };

  return (
    <HomeContainer>
      <div className="left">
        <Box>Box</Box>
        <div className="input-test">
          <TextInput
            name="title"
            value={test?.title}
            label="음원"
            isError={true}
            onChange={(event: any) => {
              setTest({
                ...test,
                title: event?.target.value,
              });
            }}
            errorMsg="에러 메시지 입니다."
          ></TextInput>
          <Button marginLeft="15px" btnType="submit">
            업로드
          </Button>
        </div>
        {!isClicked && (
          <Modal>
            등록이 완료 되었습니다.
            <Button btnType="confirm" onClick={() => setIsClicked(!isClicked)}>
              버튼
            </Button>
          </Modal>
        )}
      </div>

      <div className="right">
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
        <Textarea
          name="content"
          value={test?.content}
          errorMsg="설명을 입력해주세요."
          onChange={(event: any) => {
            setTest({
              ...test,
              content: event?.target.value,
            });
          }}
        ></Textarea>
        <ImgUpload
          name="img"
          file={test.img}
          onChange={handleChangeImg}
          onClick={() => {}}
          // isError={true}
        />
      </div>
    </HomeContainer>
  );
};

export default Home;
