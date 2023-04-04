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
import { userApi, userFunction } from "common/api/user";
import { UserProps } from "components/Login/interface";

const UserInfo = ({ className }: UserInfoProps) => {
  const [user, setUser] = useRecoilState<UserProps>(userInfo);

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

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
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

  return (
    <UserInfoContainer className={className}>
      <div className="my-info-edit">
        <div className="my-img mine">
          <ProfileImg
            name="photoURL"
            file={form?.photoURL}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeImg(e)
            }
            onClickDelete={() => userFunction?.deleteImg(setForm, "photoURL")}
          />
        </div>
        <div className="input-container">
          <TextInput
            width="100%"
            name="name"
            value={form?.name}
            label="이름"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
          ></TextInput>
          <TextInput
            name="phoneNumber"
            type="text"
            width="100%"
            value={form?.phoneNumber}
            label="휴대폰"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleSubmit(e);
          }}
        >
          수정
        </Button>
      </div>
    </UserInfoContainer>
  );
};

export default UserInfo;
