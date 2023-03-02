import Box from "components/Box";
import Button from "components/Button";
import TextInput from "components/TextInput";
import { useEffect, useState } from "react";
import { LoginProps } from "./interface";
import { LoginContainer } from "./style";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, firestore } from "service/firebase";
import Join from "components/Join";
import { useRecoilState } from "recoil";
import { loginState, userState } from "./state";

interface LoginFormProps {
  email: string;
  password: string;
}

const Login = ({ className }: LoginProps) => {
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const [loginStateDate, setLoginStateDate] = useRecoilState<any>(loginState);
  const [user, setUser] = useRecoilState<any>(userState);

  console.log("user", user);

  const login = async ({ email, password }: LoginFormProps) => {
    try {
      await setPersistence(auth, browserSessionPersistence).then(async () => {
        await signInWithEmailAndPassword(
          auth,
          `${email + "@music.com"}`,
          password
        );

        const getUid: any = auth?.currentUser?.uid.replace('"', "");

        const washingtonRef = doc(firestore, "users", getUid);

        // setDoc(washingtonRef, {
        //   userInfo: [
        //     {
        //       profile: array[0]?.img,
        //       name: array[0]?.name,
        //       nickName: array[0]?.nickName,
        //       email: auth?.currentUser?.email,
        //       phoneNumber: array[0]?.phoneNumber,
        //       creationTime: auth?.currentUser?.metadata?.creationTime,
        //       lastSignInTime: auth?.currentUser?.metadata?.lastSignInTime,
        //     },
        //   ],
        // });

        alert("로그인에 성공하였습니다.");
        window.location.reload();
      });
    } catch (err) {
      console.log("err", err);
      return alert("로그인에 실패하였습니다.");
    }
  };

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  return (
    <>
      <Box>
        <LoginContainer className={className}>
          <Button
            className="join-btn"
            btnType="submit"
            onClick={() =>
              setLoginStateDate({
                ...loginStateDate,
                isJoin: true,
              })
            }
          >
            회원가입
          </Button>
          <TextInput
            name="email"
            value={form?.email}
            label="Email"
            isError={form?.email?.length <= 5 && loginStateDate?.isLogin}
            errorMsg={"아이디를 5글자 이상 입력해주세요."}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
          ></TextInput>
          <TextInput
            name="password"
            type="password"
            isError={
              form?.password?.length <= 8 &&
              !passwordRegex?.test(form?.password) &&
              loginStateDate?.isLogin
            }
            errorMsg={
              "숫자 + 영문자 + 특수문자를 포함하여 8자리 이상 입력해주세요."
            }
            value={form?.password}
            label="Password"
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          ></TextInput>
          <Button
            marginLeft="15px"
            btnType="submit"
            onClick={() => {
              login(form);
              setLoginStateDate({
                ...loginStateDate,
                isLogin: true,
              });
            }}
          >
            로그인
          </Button>
        </LoginContainer>
        ;
      </Box>
      {loginStateDate?.isJoin && <Join></Join>}
    </>
  );
};
export default Login;
