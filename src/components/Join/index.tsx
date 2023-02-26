import Overlay from "components/Overlay";
import { JoinProps } from "./interface";
import { JoinContainer } from "./style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "service/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { firestore } from "service/firebase";
import { doc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";

const Join = ({
  className,
  width = "1150px",
  height = "780px",
  children,
}: JoinProps) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    email: "",
    password: "",
  });
  console.log("form", form);

  // 회원가입
  const signin = async ({ email, password }: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", user);
      console.log("auth", auth);

      setForm({
        email: "",
        password: "",
      });

      const washingtonRef = doc(firestore, "users", user?.uid);

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

      auth?.signOut();
      alert("회원가입에 성공하였습니다.");
      return user;
    } catch (err) {
      console.log("err", err);
      alert("회원가입에 실패하였습니다.");
      navigate("/");
    }
  };
  return (
    <Overlay>
      <JoinContainer className={className} width={width} height={height}>
        {children}

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

        <Button marginLeft="15px" btnType="submit" onClick={() => signin(form)}>
          회원가입
        </Button>
      </JoinContainer>
    </Overlay>
  );
};

export default Join;
