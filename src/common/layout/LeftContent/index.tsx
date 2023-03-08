import { LeftContentProps } from "./interface";
import { LeftContentContainer } from "./style";
import { auth, firestore } from "service/firebase";
import { useRecoilState } from "recoil";
import { userInfo } from "components/Login/state";
import Login from "components/Login";
import Box from "components/Box";
import Button from "components/Button";
import ProfileImg from "components/ProfileImg";
import { doc, setDoc } from "firebase/firestore";
import { musicListState, myMusic } from "components/AddMusic/state";
import Genre from "components/Genre";
import { useNavigate } from "react-router-dom";

const LeftContent = ({ className }: LeftContentProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [myMusicList, setMyMusicList] = useRecoilState<any>(myMusic);
  const navigate = useNavigate();
  const getUserId = auth?.currentUser?.uid.replace('"', "");
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
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
  console.log(
    "musicListTest",
    musicList?.filter((item: any) => item?.email === user?.email)?.length
  );
  return (
    <LeftContentContainer className={className}>
      {user?.email ? (
        <div className="my-content left">
          <Box>
            <Button
              className="my-music-btn"
              btnType="submit"
              onClick={() => {}}
            >
              마이뮤직
            </Button>
            <div className="my-profile">
              <strong
                className="my-page-btn"
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                마이페이지
              </strong>
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
                  <span>
                    {musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== 0
                      ? musicList?.filter(
                          (item: any) => item?.email === user?.email
                        )?.length
                      : "0"}
                  </span>
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

          <Genre></Genre>
        </div>
      ) : (
        <div className="login-content left">
          <Box>
            <Login></Login>
          </Box>
          <Genre></Genre>
        </div>
      )}
    </LeftContentContainer>
  );
};

export default LeftContent;
