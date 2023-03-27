import Button from "components/Button";
import { userInfo } from "components/Login/state";
import ProfileImg from "components/ProfileImg";
import TextInput from "components/TextInput";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { UserInfoProps } from "./interface";
import { UserInfoContainer } from "./style";
import { useMutation, useQueryClient } from "react-query";
import { userApi } from "common/api/user";

const UserInfo = ({ className }: UserInfoProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [form, setForm] = useState<any>({
    photoURL: user?.photoURL,
    name: user?.name,
    pwd: "",
    rePwd: "",
    phoneNumber: user?.phoneNumber,
    displayName: user?.displayName,
  });

  const getUserId = auth?.currentUser?.uid.replace('"', "");

  const queryClient = useQueryClient();

  const { mutate: editUser } = useMutation(
    () => userApi?.editUserData(getUserId, form, user),
    {
      onError: (error) => {
        console.log("error : ", error);
        alert("수정에 실패하였습니다.");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getUserAllList");
        alert("수정이 완료되었습니다.");
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    editUser();
  };

  const handleChangeImg = (event: any) => {
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = async () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setForm({ ...form, photoURL: fr.result });
        }
      };
    }
  };
  console.log("from", form);
  const deleteImg = () => {
    setForm({
      ...form,
      photoURL: "",
    });
  };

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
            name="photoURL"
            file={form?.photoURL}
            onChange={(e) => handleChangeImg(e)}
            onClickDelete={deleteImg}
          />
        </div>
        <div className="input-container">
          <TextInput
            width="100%"
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
            width="100%"
            name="email"
            value={user?.email?.split("@")[0]}
            label="아이디"
            onChange={(e) => {}}
          ></TextInput>
          <TextInput
            name="phoneNumber"
            type="text"
            width="100%"
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
            name="displayName"
            width="100%"
            type="text"
            value={form?.displayName}
            label="닉네임"
            onChange={(e) => {
              setForm({
                ...form,
                displayName: e.target.value,
              });
            }}
          ></TextInput>
        </div>

        <Button
          className="my-info-submit"
          btnType="submit"
          onClick={(e: any) => {
            handleSubmit(e);
            // usersListData?.find((item: any) => item?.email === form?.email)
            //   ?.displayName === form?.displayName
            //   ? alert("이미 사용중인 닉네임 입니다.")
            //   : handleSubmit(e);
          }}
        >
          수정
        </Button>
      </div>
    </UserInfoContainer>
  );
};

export default UserInfo;
