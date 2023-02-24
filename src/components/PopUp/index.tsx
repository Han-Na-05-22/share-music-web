import Overlay from "components/Overlay";
import { PopUpPorps } from "./interface";
import { PopUpContainer } from "./style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "service/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "components/TextInput";
import Button from "components/Button";

// todo : 회원가입 or 음원등록, 수정, 자세히보기

const PopUp = ({
  className,
  width = "1150px",
  height = "780px",
  children,
  isJoin = undefined,
}: PopUpPorps) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    email: "",
    password: "",
  });
  console.log("form", form);

  const signin = async ({ email, password }: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", user);
      setForm({
        email: "",
        password: "",
      });
      return user;
    } catch (err) {
      console.log("err", err);
      alert("회원가입에 실패하였습니다.");
      navigate("/");
    }
  };

  return (
    <Overlay>
      <PopUpContainer
        className={className}
        width={width}
        height={height}
        isJoin={isJoin}
      >
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
      </PopUpContainer>
    </Overlay>
  );
};

export default PopUp;
