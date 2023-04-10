import Button from "components/Button";
import TextInput from "components/TextInput";
import { useState } from "react";
import { LoginProps } from "./interface";
import { LoginContainer } from "./style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "service/firebase";
import { useRecoilState } from "recoil";
import { loginState } from "./state";
import { useMutation, useQueryClient } from "react-query";
import useInputs from "hooks/useInputs";
import { toastMsg } from "utility/toastMsg";

interface LoginFormProps {
  email: string;
  password: string;
}

const emailRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,}$/;

const Login = ({ className }: LoginProps) => {
  const [
    form,
    setForm,
    handleChangeInput,
    handleChangeSelect,
    handleChangeImg,
  ] = useInputs("login");
  const queryClient = useQueryClient();
  const [loginStateDate, setLoginStateDate] = useRecoilState<any>(loginState);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const { mutate: loginMutation } = useMutation(
    async ({ email, password }: LoginFormProps) => {
      await signInWithEmailAndPassword(
        auth,
        `${email + "@music.com"}`,
        password,
      );
    },
    {
      onError: (error) => {
        console.log("error : ", error);
        toastMsg("login", "failure");
      },
      onSuccess: async () => {
        await sessionStorage.setItem(
          "user",
          JSON.stringify({
            uid: auth?.currentUser?.uid,
            displayName: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
          }),
        );
        toastMsg("login", "success");

        setIsClicked(false);
        setLoginStateDate({
          ...loginStateDate,
          isLogin: false,
        });
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      },
    },
  );

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  return (
    <>
      <LoginContainer className={className}>
        <Button
          className="close-btn"
          btnType="submit"
          onClick={() =>
            setLoginStateDate({
              ...loginStateDate,
              isLogin: false,
            })
          }
        >
          닫기
        </Button>
        <TextInput
          name="email"
          value={form?.email}
          label="아이디"
          isError={!emailRegex?.test(form?.email) && isClicked}
          errorMsg={"아이디는 영문 및 숫자를 포함하여 5글자 이상 입력해주세요."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
        ></TextInput>
        <TextInput
          name="password"
          type="password"
          isError={
            form?.password?.length <= 8 &&
            !passwordRegex?.test(form?.password) &&
            isClicked
          }
          errorMsg={
            "숫자 + 영문자 + 특수문자를 포함하여 8자리 이상 입력해주세요."
          }
          value={form?.password}
          label="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
        ></TextInput>
        <Button
          marginLeft="15px"
          btnType="submit"
          onClick={() => {
            loginMutation(form);
            setIsClicked(true);
          }}
        >
          로그인
        </Button>
      </LoginContainer>
    </>
  );
};
export default Login;
