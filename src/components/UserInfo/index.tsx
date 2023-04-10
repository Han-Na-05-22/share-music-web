import Button from "components/Button";
import { userInfo } from "components/Login/state";
import ProfileImg from "components/ProfileImg";
import TextInput from "components/TextInput";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { UserFormProps, UserInfoProps } from "./interface";
import { UserInfoContainer } from "./style";
import { useMutation, useQueryClient } from "react-query";
import { userApi, userFunction } from "common/api/user";
import { UserProps } from "components/Login/interface";
import useInputs from "hooks/useInputs";
import { toastMsg } from "utility/toastMsg";

const UserInfo = ({ className }: UserInfoProps) => {
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [
    form,
    setForm,
    handleChangeInput,
    handleChangeSelect,
    handleChangeImg,
  ] = useInputs("user");

  const getUserId = auth?.currentUser?.uid.replace('"', "");

  const queryClient = useQueryClient();

  const { mutate: editUser } = useMutation(
    () => userApi?.editUserData(getUserId, form, user),
    {
      onError: (error) => {
        console.log("error : ", error);

        toastMsg("update", "failure");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("getUserAllList");
        toastMsg("update", "success");
      },
    },
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editUser();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>
          <TextInput
            width="100%"
            name="email"
            value={user?.email?.split("@")[0]}
            label="아이디"
            onChange={() => {}}
          ></TextInput>
          <TextInput
            name="phoneNumber"
            type="text"
            width="100%"
            value={form?.phoneNumber}
            label="휴대폰"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>

          <TextInput
            name="displayName"
            width="100%"
            type="text"
            value={form?.displayName}
            label="닉네임"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
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
