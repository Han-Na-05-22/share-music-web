import Container from "common/layout/Container";
import Header from "common/layout/Header";
import { musicListState } from "components/AddMusic/state";
import { ToastContainer } from "react-toastify";
import { allUserInfo, userInfo } from "components/Login/state";
import { myMusicPlayListState } from "pages/MyPage/state";
import NotFound from "pages/NotFound";
import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "service/firebase";
import { useQuery } from "react-query";
import { userApi } from "common/api/user";
import { musicApi } from "common/api/music";
import PlayList from "components/PlayList";
import { isMusicDetailState } from "components/MusicDetail/state";
import { UserProps } from "components/Login/interface";
import {
  MusicCountListProps,
  MusicFormProps,
} from "components/AddMusic/interface";
import { MusicDetailStateProps } from "components/MusicDetail/interface";
import { navState } from "common/layout/Nav/state";
import Loading from "components/Loading";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import MusicTable from "pages/MusicTable";

function App() {
  const [user, setUser] = useRecoilState<UserProps>(userInfo);
  const [navData, setNavData] = useRecoilState<any[]>(navState);
  const [userAll, setUserAll] = useRecoilState<UserProps[]>(allUserInfo);
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);
  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<MusicFormProps[]>(myMusicPlayListState);
  const navigate = useNavigate();
  const { isLoading: getUserListLoading, data: UserAllList } = useQuery<any>(
    "getUserAllList",
    userApi?.getUserAllDataList(),
  );

  const { isLoading: userDataLoading, data: userData } = useQuery<{
    displayName: string;
    email: string;
    uid: string;
  }>("getUser", () => {
    return JSON.parse(sessionStorage.getItem("user") || "{}");
  });

  const { isLoading: musicAllListDataLoading, data: musicAllListData } =
    useQuery<MusicFormProps[]>(
      "getMusicAllDataList",
      musicApi?.getMusicAllDataList(),
      {
        refetchInterval: 5000,
      },
    );

  let getDownloadMusicList: any = "";

  const getDownloadMusicData = () => {
    musicList
      ?.filter((item: MusicFormProps) => item?.email !== user?.email)
      ?.map((i: MusicFormProps) => {
        i?.downloadClickList?.filter((a: MusicCountListProps) => {
          if (a?.email === user?.email) {
            return (getDownloadMusicList = [...getDownloadMusicList, i]);
          }
        });
      });
  };

  useEffect(() => {
    setUserAll(UserAllList);
    if (auth?.currentUser !== null || userData) {
      setUser(
        UserAllList?.find(
          (i: UserProps) =>
            i?.email === (auth?.currentUser?.email || userData?.email),
        ),
      );
    }
  }, [UserAllList, userData]);

  useEffect(() => {
    if (musicAllListData) {
      setMusicList(
        musicAllListData
          ?.map((item: MusicFormProps) => {
            return item;
          })
          ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.id - a?.id),
      );
    }
  }, [musicAllListData]);

  useEffect(() => {
    getDownloadMusicData();

    if (getDownloadMusicList) {
      setMyMusicPlayList(
        getDownloadMusicList
          ?.concat(
            musicList?.filter(
              (item: MusicFormProps) => item?.email === user?.email,
            ),
          )
          ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.id - a?.id),
      );
    } else {
      setMyMusicPlayList(
        musicList
          ?.filter((item: MusicFormProps) => item?.email === user?.email)
          ?.sort((a: MusicFormProps, b: MusicFormProps) => b?.id - a?.id),
      );
    }
  }, [musicList]);

  useEffect(() => {
    navigate(
      navData?.find((i: any) => {
        if (i?.name === "Home" && i?.isClicked) {
          return i;
        }
      })?.nav,
    );
  }, []);

  return (
    <>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        limit={3}
      />
      <div className="App">
        <Container>
          <Suspense fallback={<Loading />}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/musicTable" element={<MusicTable />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>

            <PlayList
              className={
                isDetailData?.isLocation === "playList"
                  ? "detail-play-list"
                  : ""
              }
              onClick={() => {
                setIsDetailData({
                  isDetail: true,
                  isLocation: "playList",
                });
              }}
              play={false}
              playListData={myMusicPlayList}
            ></PlayList>
          </Suspense>
        </Container>
      </div>
    </>
  );
}

export default App;
