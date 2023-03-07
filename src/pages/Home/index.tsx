import { HomeContainer } from "./style";
import SVG from "react-inlinesvg";
import Box from "components/Box";
import TextInput from "components/TextInput";
import { useEffect, useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Tabel from "components/Table";
import Textarea from "components/Textarea";
import Pagination from "components/Pagination";
import { dummyData } from "utility/data";
import ProfileImg from "components/ProfileImg";
import CheckBox from "components/CheckBox";
import Record from "components/Record";
import { auth } from "service/firebase";
import Join from "components/Join";
import Login from "components/Login";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import { musicListState } from "components/AddMusic/state";
import {
  isMusicDetailState,
  musicDetailState,
  musicDetailUrlState,
} from "components/MusicDetail/state";
import MusicDetail from "components/MusicDetail";
import * as functions from "../../common/functions";
// todo : top, new 등 리스트가 없을 때 에러처리, 404 page(완)

const Home = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const [musicDetailData, setMusicDetailData] =
    useRecoilState<any>(musicDetailState);
  const [musicDetailUrl, setMusicDetailUrl] =
    useRecoilState<any>(musicDetailUrlState);

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

  // page
  const handleChangePage = (page: any) => {
    if (tdContent.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

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

  // checkbox
  const handleChangeCheckBox = () => {
    setTest({
      ...test,
      checkBox: !test?.checkBox,
    });
  };

  // img
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
          {musicList?.length !== undefined ? (
            musicList
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => {
                    setIsDetailData(true);
                    setMusicDetailData(item);
                    functions.getMusicUrlFunction(
                      item?.email,
                      setMusicDetailUrl,
                      item?.mp3
                    );
                  }}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
          )}
        </Tabel>
        <Pagination
          total={tdContent.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
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
          {musicList?.length !== undefined ? (
            musicList
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
                <tr key={idx} onClick={() => {}}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
          )}
        </Tabel>
        <Pagination
          total={tdContent.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
      {/* <div className="right">
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
        <Join>Join</Join>
        <Login></Login>
        <Record isPlay={isPlay} onClickPlay={handleChangePlay} />
      </div> */}
      {isDetailData && <MusicDetail detailData={musicDetailData}></MusicDetail>}
    </HomeContainer>
  );
};

export default Home;
