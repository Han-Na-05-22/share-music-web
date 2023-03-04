import Overlay from "components/Overlay";
import { JoinFormProps, JoinProps } from "./interface";
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
import ProfileImg from "components/ProfileImg";
import { useRecoilState } from "recoil";
import { loginState } from "components/Login/state";

const Join = ({ className, width = "1150px", height = "780px" }: JoinProps) => {
  const navigate = useNavigate();

  const [joinStateDate, setJoinStateDate] = useRecoilState<any>(loginState);
  const [form, setForm] = useState<JoinFormProps>({
    img: "",
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
    nickName: "",
  });

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  // 회원가입

  const signin = async (event: any, { email, password }: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        `${email + "@music.com"}`,
        password
      );

      const washingtonRef = doc(firestore, "users", user?.uid);

      await setDoc(washingtonRef, {
        userInfo: {
          profile: form?.img,
          name: form?.name,
          nickName: form?.nickName,
          email: auth?.currentUser?.email,
          phoneNumber: form?.phoneNumber,
          creationTime: auth?.currentUser?.metadata?.creationTime,
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
        nickName: "",
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

  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setForm({ ...form, [name]: fr.result });
        }
      };
    }
  };

  const deleteImg = () => {
    setForm({
      ...form,
      img: "",
    });
  };

  return (
    <Overlay>
      <JoinContainer className={className} width={width} height={height}>
        <div className="user-infos">
          <div className="user-img users">
            <ProfileImg
              name="img"
              file={form.img}
              onChange={handleChangeImg}
              onClickDelete={deleteImg}
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
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value,
                });
              }}
            ></TextInput>
            <TextInput
              width="350px"
              name="email"
              value={form?.email}
              label="아이디"
              isError={isClicked && form?.email?.length <= 5}
              errorMsg={"아이디를 5글자 이상 입력해주세요."}
              onChange={(e) => {
                setForm({
                  ...form,
                  email: e.target.value,
                });
              }}
            ></TextInput>
          </div>

          <TextInput
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
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          ></TextInput>
          <TextInput
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
            onChange={(e) => {
              setForm({
                ...form,
                rePassword: e.target.value,
              });
            }}
          ></TextInput>

          <div className="user-phone-nickName users">
            <TextInput
              name="phoneNumber"
              type="text"
              width="350px"
              value={form?.phoneNumber}
              label="휴대폰"
              isError={isClicked && !phoneRegex?.test(form?.phoneNumber)}
              errorMsg={"하이픈을 포함한 숫자 11자리를 입력해주세요."}
              onChange={(e) => {
                setForm({
                  ...form,
                  phoneNumber: e.target.value,
                });
              }}
            ></TextInput>

            <TextInput
              name="nickName"
              width="350px"
              type="text"
              value={form?.nickName}
              label="닉네임"
              isError={isClicked && form?.nickName?.length === 0}
              errorMsg={"닉네임을 입력해주세요."}
              onChange={(e) => {
                setForm({
                  ...form,
                  nickName: e.target.value,
                });
              }}
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
              btnType={
                form?.name?.length !== 0 &&
                form?.nickName?.length !== 0 &&
                form?.rePassword?.length !== 0 &&
                form?.password === form?.rePassword &&
                form?.password?.length >= 8 &&
                passwordRegex?.test(form?.password) &&
                form?.email?.length >= 5 &&
                phoneRegex?.test(form?.phoneNumber)
                  ? "submit"
                  : "none"
              }
              onClick={(e) => signin(e, form)}
            >
              확인
            </Button>
          </div>
        </div>
      </JoinContainer>
    </Overlay>
  );
};

export default Join;
