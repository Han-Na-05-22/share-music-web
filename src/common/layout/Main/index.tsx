import { MainProps } from "./interface";
import { MainContainer } from "./style";
import { auth, firestore } from "service/firebase";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import Login from "components/Login";
import { useEffect } from "react";
import Box from "components/Box";
import Button from "components/Button";
import ProfileImg from "components/ProfileImg";
import { doc, setDoc } from "firebase/firestore";

// todo: 이미지 변경 시 데이터베이스 profile도 수정 해야함(우선처리) --- 완
// todo:음악등록 컴포넌트 만들기(우선처리)
const Main = ({ children, className }: MainProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  console.log("useruser", user);
  const getUserId = auth?.currentUser?.uid.replace('"', "");

  console.log("getUserId", getUserId);
  const handleChangeImg = (event: any) => {
    const { name } = event.target;
    const formData = new FormData();
    const fr = new FileReader();
    const file = event.target.files[0];

    if (file) {
      fr.readAsDataURL(file);

      fr.onload = async () => {
        if (typeof fr.result === "string") {
          formData.append("file", file);
          setUser({ ...user, [name]: fr.result });
          const washingtonRef = doc(firestore, "users", `${getUserId}`);

          await setDoc(washingtonRef, {
            userInfo: {
              ...user,
              profile: fr.result,
            },
          });
        }
      };
    }
  };

  const deleteImg = () => {
    setUser({
      ...user,
      profile: "",
    });
  };

  return (
    <MainContainer className={className}>
      {user?.email ? (
        <div className="my-content left">
          <Box>
            <div className="my-profile">
              <ProfileImg
                name="profile"
                file={user.profile}
                onChange={handleChangeImg}
                onClickDelete={deleteImg}
              />
              <p>{user?.nickName} 님 환영합니다!</p>
              <ul>
                <li>
                  <span>등록 수</span>
                  <span>0</span>
                </li>
                <li>
                  <span>좋아요</span>
                  <span>122</span>
                </li>
                <li>
                  <span>다운로드</span>
                  <span>300</span>
                </li>
              </ul>
              <strong
                onClick={() => {
                  auth?.signOut();
                  window?.location?.reload();
                }}
              >
                로그아웃
              </strong>
            </div>
          </Box>
          <Box width="400px" height="300px">
            내 음악 듣기
          </Box>
        </div>
      ) : (
        <div className="login-content left">
          <Box>
            <Login></Login>
          </Box>
          <Box width="400px" height="300px">
            로그인 후 이용해 주시기 바랍니다.
          </Box>
        </div>
      )}
      {children}
    </MainContainer>
  );
};

export default Main;
