import Box from "components/Box";
import Button from "components/Button";
import TextInput from "components/TextInput";
import { useState } from "react";
import { LoginProps } from "./interface";
import { LoginContainer } from "./style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "service/firebase";
import { useRecoilState } from "recoil";
import { userInfo } from "./state";

interface LoginFormProps {
  email: string;
  password: string;
}

const Login = ({ className }: LoginProps) => {
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  console.log("form", form);

  const [user, setUser] = useRecoilState<any>(userInfo);
  console.log("user", user);

  const login = async ({ email, password }: LoginFormProps) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const getUid: any = auth?.currentUser?.uid.replace('"', "");
      console.log("getUid", getUid);
      const washingtonRef = doc(firestore, "users", getUid);

      await setDoc(washingtonRef, {
        userInfo: [
          {
            name: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            profile: auth?.currentUser?.photoURL,
            creationTime: auth?.currentUser?.metadata?.creationTime,
            lastSignInTime: auth?.currentUser?.metadata?.lastSignInTime,
          },
        ],
      });

      await localStorage?.setItem(
        "token",
        JSON.stringify(auth?.currentUser?.refreshToken)
      );

      await setUser({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        profile: auth?.currentUser?.photoURL,
      });

      alert("로그인에 성공하였습니다.");
    } catch (err) {
      console.log("err", err);
      return alert("로그인에 실패하였습니다.");
    }
  };
  return (
    <Box>
      <LoginContainer className={className}>
        <TextInput
          name="email"
          value={form?.email}
          label="Email"
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
          }}
        >
          로그인
        </Button>
      </LoginContainer>
      ;
    </Box>
  );
};
export default Login;
