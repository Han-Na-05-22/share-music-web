import { JoinFormProps, JoinProps } from "./interface";
import { JoinContainer } from "./style";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "service/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { firestore } from "service/firebase";
import { doc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import ProfileImg from "components/ProfileImg";
import { useRecoilState } from "recoil";
import { loginState } from "components/Login/state";
import { userFunction } from "common/api/user";
import useInputs from "hooks/useInputs";
import { toastMsg } from "utility/toastMsg";

const Join = ({ className, width = "1150px", height = "780px" }: JoinProps) => {
  const navigate = useNavigate();

  const [joinStateDate, setJoinStateDate] = useRecoilState<any>(loginState);

  const [
    form,
    setForm,
    handleChangeInput,
    handleChangeSelect,
    handleChangeImg,
  ] = useInputs("join");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  const emailRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,}$/;

  const isRegex: boolean =
    form?.name?.length !== 0 &&
    form?.displayName?.length !== 0 &&
    form?.rePassword?.length !== 0 &&
    form?.password === form?.rePassword &&
    form?.password?.length >= 8 &&
    passwordRegex?.test(form?.password) &&
    emailRegex?.test(form?.email) &&
    phoneRegex?.test(form?.phoneNumber);

  const signUp = async ({ email, password, displayName }: any) => {
    try {
      const { user }: any = await createUserWithEmailAndPassword(
        auth,
        `${email + "@music.com"}`,
        password,
      );
      await updateProfile(user, {
        displayName: displayName,
      });

      const washingtonRef = await doc(firestore, "users", user?.uid);

      await setDoc(washingtonRef, {
        userInfo: {
          photoURL: form?.img,
          name: form?.name,
          displayName: displayName,
          email: `${email}@music.com`,
          phoneNumber: form?.phoneNumber,
          creationTime: user?.metadata?.creationTime,
        },
      });
      toastMsg("join", "success");

      await auth?.signOut();

      setJoinStateDate(false);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch {
      toastMsg("join", "failure");
    }
  };

  return (
    <JoinContainer className={className} width={width} height={height}>
      <div className="user-infos">
        <div className="user-img users">
          <ProfileImg
            name="img"
            file={form.img}
            onChange={handleChangeImg}
            onClickDelete={() => userFunction?.deleteImg(setForm, "img")}
          />
        </div>
        <div className="user-name-id users">
          <TextInput
            width="350px"
            name="name"
            value={form?.name}
            isError={form?.name?.length === 0}
            errorMsg={"이름을 입력해주세요."}
            label="이름"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>
          <TextInput
            width="350px"
            name="email"
            value={form?.email}
            label="아이디"
            isError={!emailRegex?.test(form?.email)}
            errorMsg={"영문 및 숫자를 포함하여 5글자 이상 입력해주세요."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>
        </div>

        <TextInput
          className="user-password password"
          name="password"
          type="password"
          width="800px"
          isError={
            form?.password?.length <= 8 && !passwordRegex?.test(form?.password)
          }
          errorMsg={"숫자 + 영문 + 특수문자를 포함한 8자리 이상 입력해주세요."}
          value={form?.password}
          label="비밀번호"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
        ></TextInput>
        <TextInput
          className="user-re-password password"
          name="rePassword"
          type="password"
          width="800px"
          value={form?.rePassword}
          isError={
            form?.password !== form?.rePassword ||
            form?.rePassword?.length === 0
          }
          errorMsg={"비밀번호가 같지 않습니다."}
          label="비밀번호 확인"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
        ></TextInput>

        <div className="user-phone-displayName users">
          <TextInput
            name="phoneNumber"
            type="text"
            width="350px"
            value={form?.phoneNumber
              .replace(/[^0-9]/g, "")
              .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
              .replace(/(\-{1,2})$/g, "")}
            label="휴대폰"
            isError={!phoneRegex?.test(form?.phoneNumber)}
            errorMsg={"양식은 000-0000-0000 입니다."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>

          <TextInput
            name="displayName"
            width="350px"
            type="text"
            value={form?.displayName}
            label="닉네임"
            isError={form?.displayName?.length === 0}
            errorMsg={"닉네임을 입력해주세요."}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeInput(e)
            }
          ></TextInput>
        </div>
        <div className="btn-container">
          <Button
            btnType="cancel"
            onClick={() => {
              setJoinStateDate(false);
            }}
          >
            취소
          </Button>
          <Button
            marginLeft="15px"
            btnType={isRegex ? "submit" : "none"}
            onClick={(e: any) => {
              if (isRegex) {
                signUp({
                  email: form?.email,
                  password: form?.password,
                  displayName: form?.displayName,
                });
              } else {
                e.stopPropagation();
              }
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </JoinContainer>
  );
};

export default Join;
