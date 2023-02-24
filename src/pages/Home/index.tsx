import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Tabel from "components/Table";
import Textarea from "components/Textarea";
import Pagination from "components/Pagination";
import { dummyData } from "utility/data";
import ProfileImg from "components/ProfileImg";
import CheckBox from "components/CheckBox";
import PopUp from "components/PopUp";
import Record from "components/Record";
import { auth } from "service/firebase";
// todo : 파이어베이스 로그인 및 회원가입 기능 구현 및 top, new 등 리스트가 없을 때 에러처리, 404 page

const Home = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [test, setTest] = useState<any>({
    title: "",
    content: "",
    img: "",
    checkBox: false,
  });
  const offset = (page - 1) * limit;
  const [tdContent, setTdContent] = useState<any[]>(dummyData);
  console.log("auth", auth);
  const handleChangePage = (page: any) => {
    if (tdContent.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  console.log("test", test);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleChangePlay = () => {
    setIsPlay(!isPlay);
  };

  const deleteImg = () => {
    setTest({
      ...test,
      img: "",
    });
  };

  const handleChangeCheckBox = () => {
    setTest({
      ...test,
      checkBox: !test?.checkBox,
    });
  };

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
  console.log("isPlay", isPlay);
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
        <div className="tabel-container">
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
            {tdContent
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
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
          <Pagination
            total={tdContent.length}
            limit={limit}
            page={page}
            setPage={setPage}
            handleChangePage={handleChangePage}
          />
        </div>

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
        <ProfileImg
          name="img"
          file={test.img}
          onChange={handleChangeImg}
          onClickDelete={deleteImg}
        />
        <CheckBox
          name="checkBox"
          value={test?.checkBox}
          checked={test?.checkBox}
          onChange={handleChangeCheckBox}
        />
        {/* <PopUp>
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
          ></TextInput>{" "}
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
          <Button marginLeft="15px" btnType="submit">
            업로드
          </Button>
        </PopUp> */}
        <Record isPlay={isPlay} onClickPlay={handleChangePlay} />
      </div>
    </HomeContainer>
  );
};

export default Home;
