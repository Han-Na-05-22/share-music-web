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
import { musicListState } from "components/AddMusic/state";
import Genre from "components/Genre";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlayList from "components/PlayList";
import { myMusicPlayListState } from "pages/MyPage/state";
import { isMusicDetailState } from "components/MusicDetail/state";

const LeftContent = ({ className }: LeftContentProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);

  const navigate = useNavigate();
  const getUserId = auth?.currentUser?.uid.replace('"', "");
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
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
    <LeftContentContainer className={className}>
      {user?.email ? (
        <div className="my-content left">
          <Box>
            <Button
              className="my-music-btn"
              btnType="submit"
              onClick={() => {
                setIsDetailData({
                  isDetail: true,
                  isLocation: "playList",
                });
              }}
            >
              음악 듣기
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
                    )?.length !== 0 &&
                    musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== undefined
                      ? musicList?.filter(
                          (item: any) => item?.email === user?.email
                        )?.length
                      : "0"}
                  </span>
                </li>
                <li>
                  <span>좋아요</span>
                  <span>
                    {musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== 0 &&
                    musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== undefined
                      ? musicList
                          ?.filter((i: any) => i?.email === user?.email)
                          ?.map((a: any) => a?.likeCount)
                          ?.reduce((sum: number, currValue: number) => {
                            return sum + currValue;
                          })
                      : "0"}
                  </span>
                </li>
                <li>
                  <span>리스너 수</span>
                  <span>
                    {musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== 0 &&
                    musicList?.filter(
                      (item: any) => item?.email === user?.email
                    )?.length !== undefined
                      ? musicList
                          ?.filter((i: any) => i?.email === user?.email)
                          ?.map((a: any) => a?.downloadCount)
                          ?.reduce((sum: number, currValue: number) => {
                            return sum + currValue;
                          })
                      : "0"}
                  </span>
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
      {isDetailData?.isLocation === "playList" && (
        <PlayList playListData={myMusicPlayList}></PlayList>
      )}
    </LeftContentContainer>
  );
};

export default LeftContent;
