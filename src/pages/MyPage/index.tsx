import { musicListState, myMusic } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Pagination from "components/Pagination";
import Tabel from "components/Table";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MyPageContainer } from "./style";
import SVG from "react-inlinesvg";
import Join from "components/Join";
import Button from "components/Button";
import ProfileImg from "components/ProfileImg";
import TextInput from "components/TextInput";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "service/firebase";
import * as functions from "../../common/functions";
// todo : 내정보(아이디 제외하고 모두 수정 가능!(완) 단 사용중인 닉네임이 있을 경우 중복된 닉네임 안내 모달 창 띄워주기), 내음악(수정, 삭제 및 상세보기), 플레이리스트(드래그 앤 드롭 기능 및 삭제 및 상세보기)

const MyPage = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);
  console.log("myMusicList", myMusicList);
  const [form, setForm] = useState<any>({
    profile: "",
    name: "",
    pwd: "",
    rePwd: "",
    phoneNumber: "",
    nickName: "",
  });

  const [user, setUser] = useRecoilState<any>(userInfo);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  // todo : 공통함수
  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };
  const getUserId = auth?.currentUser?.uid.replace('"', "");
  console.log("getUserId", getUserId);
  //todo : 공통함수
  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = async () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setUser({ ...user, [name]: fr.result });
          const washingtonRef = doc(firestore, "users", `${getUserId}`);

          await setDoc(washingtonRef, {
            userInfo: {
              ...user,
              profile: fr.result,
            },
          });
        }
      };
    }
  };

  // todo : 공통함수
  const deleteImg = () => {
    setUser({
      ...user,
      profile: "",
    });
  };
  useEffect(() => {
    if (user?.email) {
      setForm({
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        nickName: user?.nickName,
      });

      functions?.myMusicListFunction(`music/${user?.email}/`, setMyMusicList);
    }
  }, []);

  return (
    <MyPageContainer>
      <div className="my-info-container">
        <Button
          className="my-info-btn"
          height="60px"
          btnType="submit"
          onClick={() => {}}
        >
          내정보
        </Button>

        <div className="my-info-edit">
          <div className="my-img mine">
            <ProfileImg
              name="profile"
              file={user?.profile}
              onChange={handleChangeImg}
              onClickDelete={deleteImg}
            />
          </div>
          <div className="my-name-id mine">
            <TextInput
              width="220px"
              name="name"
              value={form?.name}
              label="이름"
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value,
                });
              }}
            ></TextInput>
            <TextInput
              width="220px"
              name="email"
              value={user?.email?.split("@")[0]}
              label="아이디"
              onChange={(e) => {}}
            ></TextInput>
          </div>

          <TextInput
            name="password"
            type="password"
            width="465px"
            value={form?.pwd}
            label="비밀번호"
            onChange={(e) => {
              setForm({
                ...form,
                pwd: e.target.value,
              });
            }}
          ></TextInput>
          <TextInput
            name="rePassword"
            type="password"
            width="465px"
            value={form?.rePwd}
            label="비밀번호 확인"
            onChange={(e) => {
              setForm({
                ...form,
                rePassword: e.target.value,
              });
            }}
          ></TextInput>

          <div className="my-phone-nickName mine">
            <TextInput
              name="phoneNumber"
              type="text"
              width="220px"
              value={form?.phoneNumber}
              label="휴대폰"
              onChange={(e) => {
                setForm({
                  ...form,
                  phoneNumber: e.target.value,
                });
              }}
            ></TextInput>

            <TextInput
              name="nickName"
              width="220px"
              type="text"
              value={form?.nickName}
              label="닉네임"
              onChange={(e) => {
                setForm({
                  ...form,
                  nickName: e.target.value,
                });
              }}
            ></TextInput>
          </div>
          <Button
            className="my-info-submit"
            btnType="submit"
            onClick={() => {
              functions.sendUserDataFunction(getUserId, form, user, setUser);
            }}
          >
            수정
          </Button>
        </div>
      </div>

      <div className="tabel-container">
        <Tabel
          tableBtnText={"내 음악"}
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
              title: "",
            },
            {
              title: "",
            },
          ]}
        >
          {myMusicList?.length !== undefined || myMusicList?.length !== 0 ? (
            myMusicList
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
                <tr key={idx} onClick={() => {}}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item.meta?.customMetadata?.img} alt="" />
                  </td>
                  <td>{item?.meta?.customMetadata?.title}</td>
                  <td>{item.meta?.customMetadata?.singer}</td>
                  <td>
                    <SVG src="/svg/term_edit.svg" />
                  </td>
                  <td>
                    <SVG src="/svg/term_delete.svg" />
                  </td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
          )}
        </Tabel>
        <Pagination
          total={musicList.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
      <div className="tabel-container">
        <Tabel
          tableBtnText={"플레이리스트"}
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
              title: "",
            },
            {
              title: "",
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
                  <td>
                    <SVG src="/svg/term_edit.svg" />
                  </td>
                  <td>
                    <SVG src="/svg/term_delete.svg" />
                  </td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
          )}
        </Tabel>
        <Pagination
          total={musicList.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </MyPageContainer>
  );
};

export default MyPage;
