import Button from "components/Button";
import { userInfo } from "components/Login/state";
import ProfileImg from "components/ProfileImg";
import TextInput from "components/TextInput";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { auth, firestore } from "service/firebase";
import { UserInfoProps } from "./interface";
import { UserInfoContainer } from "./style";
import * as functions from "../../common/functions";
const UserInfo = ({ className }: UserInfoProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [form, setForm] = useState<any>({
    profile: user?.profile,
    name: user?.name,
    pwd: "",
    rePwd: "",
    phoneNumber: user?.phoneNumber,
    nickName: user?.nickName,
  });
  const [usersListData, setUserListData] = useState<any[]>();
  const getUserId = auth?.currentUser?.uid.replace('"', "");
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
          setForm({ ...form, [name]: fr.result });
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

  const deleteImg = () => {
    setUser({
      ...user,
      profile: "",
    });
  };

  useEffect(() => {
    if (user?.email) {
      setForm({
        profile: user?.profile,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        nickName: user?.nickName,
      });

      functions?.getUsersListDataFunction(setUserListData);
    }
  }, []);
  return (
    <UserInfoContainer className={className}>
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
            file={form?.profile}
            onChange={(e) => handleChangeImg(e)}
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
          value={form?.pwd || ""}
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
          value={form?.rePwd || ""}
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
            if (
              usersListData?.filter(
                (item: any) => item?.nickName === form?.nickName
              )?.length !== 0
            ) {
              alert("이미 사용중인 닉네임 입니다.");
            } else {
              functions.sendUserDataFunction(getUserId, form, user, setUser);
            }
          }}
        >
          수정
        </Button>
      </div>
    </UserInfoContainer>
  );
};

export default UserInfo;
