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
import imageCompression from "browser-image-compression";
import { userFunction } from "common/api/user";
import useInputs from "hooks/useInputs";

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

  const [isClicked, setIsClicked] = useState<boolean>(false);

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
      await isRegex;
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

      auth?.signOut();

      setForm({
        img: "",
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phoneNumber: "",
        displayName: "",
      });

      alert("회원가입에 성공하였습니다.");
      window.location.reload();
      setJoinStateDate(false);
      setIsClicked(false);
      return user;
    } catch (err) {
      setIsClicked(true);
      console.log("err", err);
      alert("회원가입에 실패하였습니다.");
      navigate("/");
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
            isError={isClicked && form?.name?.length === 0}
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
            isError={isClicked && !emailRegex?.test(form?.email)}
            errorMsg={
              "아이디는 영문 및 숫자를 포함하여 5글자 이상 입력해주세요."
            }
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
            isClicked &&
            form?.password?.length <= 8 &&
            !passwordRegex?.test(form?.password)
          }
          errorMsg={
            "숫자 + 영문자 + 특수문자를 포함하여 8자리 이상 입력해주세요."
          }
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
            isClicked &&
            (form?.password !== form?.rePassword ||
              form?.rePassword?.length === 0)
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
            value={form?.phoneNumber}
            label="휴대폰"
            isError={isClicked && !phoneRegex?.test(form?.phoneNumber)}
            errorMsg={"하이픈을 포함한 숫자 11자리를 입력해주세요."}
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
            isError={isClicked && form?.displayName?.length === 0}
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
            btnType={"submit"}
            onClick={() => {
              signUp({
                email: form?.email,
                password: form?.password,
                displayName: form?.displayName,
              });
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
