import Box from "components/Box";
import Button from "components/Button";
import TextInput from "components/TextInput";
import { useState } from "react";
import { LoginProps } from "./interface";
import { LoginContainer } from "./style";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "service/firebase";

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

  const login = async ({ email, password }: LoginFormProps) => {
    try {
      await setPersistence(auth, browserSessionPersistence).then(async () => {
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

        alert("로그인에 성공하였습니다.");
        window.location.reload();
      });
    } catch (err) {
      console.log("err", err);
      return alert("로그인에 실패하였습니다.");
    }
  };
  return (
    <Box>
      <LoginContainer className={className}>
        <Button className="join-btn" btnType="submit">
          회원가입
        </Button>
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
