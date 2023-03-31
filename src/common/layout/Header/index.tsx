import { musicListState, myMusicAddState } from "components/AddMusic/state";
import Button from "components/Button";
import { useRecoilState } from "recoil";
import { HeaderContainer, SimplePrpfileContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { loginState, userInfo } from "components/Login/state";
import TextInput from "components/TextInput";
import { searchInputState } from "components/TextInput/state";
import { filterMusicListState } from "pages/MusicTable/state";
import BasicSelect from "components/BasicSelect";
import { GenreListAll } from "utility/data";
import { useState } from "react";
import Join from "components/Join";
import Overlay from "components/Overlay";
import Login from "components/Login";
import { auth } from "service/firebase";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMusic from "components/AddMusic";
import Nav from "../Nav";
import { navState } from "../Nav/state";
import { isMusicDetailState } from "components/MusicDetail/state";
import SVG from "react-inlinesvg";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  const iconLogo = faHeadphonesSimple as IconProp;
  const [search, setSearch] = useRecoilState<any>(searchInputState);
  const [loginStateDate, setLoginStateDate] = useRecoilState<any>(loginState);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [user, setUser] = useRecoilState<any>(userInfo);

  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  const [navData, setNavData] = useRecoilState<any[]>(navState);

  const [filterMusicList, setFilterMusicList] =
    useRecoilState<any>(filterMusicListState);
  const iconMyMusic = faRecordVinyl as IconProp;
  const [filterGenre, setFilterGenre] = useState<string>("All");

  const handleChangeSelect = async (isSelected?: any) => {
    if (search?.length === 0 && isSelected === "All") {
      setFilterMusicList(musicList);
    }
    if (search?.length === 0 && isSelected !== "All") {
      setFilterMusicList(
        musicList?.filter((i: any) => i?.genre === isSelected)
      );
    }

    if (search?.length !== 0 && isSelected === "All") {
      setFilterMusicList(musicList?.filter((i: any) => i?.title === search));
    }

    if (search?.length !== 0 && isSelected !== "All") {
      setFilterMusicList(
        musicList?.filter(
          (i: any) => i?.title === search && i?.genre === isSelected
        )
      );
    }
  };

  return (
    <>
      <HeaderContainer>
        <div className="header-top">
          <h1
            onClick={() => {
              navigate("/");
              setFilterGenre("All");
              setSearch("");
              setIsDetailData({
                ...isDetailData,
                isLocation: "simpleProfile",
              });
              setFilterMusicList(musicList?.filter((item: any) => item));
              setNavData(
                navData?.map((i: any) => {
                  if (i?.name === "Home") {
                    return {
                      ...i,
                      isClicked: true,
                    };
                  }
                  return {
                    ...i,
                    isClicked: false,
                  };
                })
              );
            }}
          >
            <FontAwesomeIcon
              icon={iconLogo}
              onClick={(e: any) => {
                e.preventDefault();
              }}
            />
            <span>MUSIC</span>
          </h1>
          <div className="search">
            <BasicSelect
              selectData={GenreListAll}
              name="genre"
              value={filterGenre}
              onChange={async (event: any) => {
                await setFilterGenre(
                  event.target.options[event.target.selectedIndex].value
                );
                handleChangeSelect(
                  event.target.options[event.target.selectedIndex].value
                );
              }}
            ></BasicSelect>

            <TextInput
              fontSize="14px"
              width="400px"
              name="search"
              value={search}
              placeholder="노래 제목을 입력해주세요."
              onChange={(e: any) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
              label=""
            ></TextInput>
            <Button
              fontSize="18px"
              width="75px"
              className="my-info-submit"
              btnType="submit"
              onClick={async (e) => {
                await handleChangeSelect(filterGenre);

                search === ""
                  ? alert("노래 제목을 입력해주세요.")
                  : setFilterMusicList(
                      musicList?.filter((item: any) => {
                        if (filterGenre === "All") {
                          return item?.title === search;
                        } else {
                          return (
                            item?.genre === filterGenre &&
                            item?.title === search
                          );
                        }
                      })
                    );
                search !== "" && navigate("/musicTable");
              }}
            >
              검색
            </Button>
          </div>
          <Button
            height="50px"
            btnType="add"
            className="add-music"
            width="125px"
            onClick={() => {
              !user?.email
                ? alert("로그인 후 이용해주세요")
                : setIsAddMuisc(true);
            }}
          >
            음원 등록
          </Button>
        </div>
        <div className="header-bottom">
          <Nav></Nav>
          <div className="auth-container">
            {auth?.currentUser ? (
              <div className="auth-content">
                <div className="auth-btn-container">
                  <strong
                    className="my-page-btn"
                    onClick={() => {
                      !user?.email
                        ? alert("로그인 후 이용해주세요")
                        : setIsDetailData({
                            ...isDetailData,
                            isLocation: "mypage",
                          });
                      navigate("/mypage");
                    }}
                  >
                    Mypage
                  </strong>

                  <strong
                    onClick={() => {
                      auth?.signOut();
                      sessionStorage?.removeItem("user");
                      window?.location?.reload();
                    }}
                  >
                    Logout
                  </strong>
                </div>
              </div>
            ) : (
              <div className="auth-content join">
                <div className="auth-btn-container">
                  <strong
                    onClick={() =>
                      setLoginStateDate({
                        ...loginStateDate,
                        isLogin: true,
                      })
                    }
                  >
                    Login
                  </strong>
                  <strong
                    className="join-btn"
                    onClick={() =>
                      setLoginStateDate({
                        ...loginStateDate,
                        isJoin: true,
                      })
                    }
                  >
                    Join
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
        {isDetailData?.isLocation !== "mypage" && (
          <SimplePrpfileContainer>
            <div className="auth-profile">
              <img src={user?.photoURL} alt="" />
              <span>{user?.displayName} </span>
            </div>
            <div className="my-counts">
              <div className="heart-count count">
                <SVG src="/svg/heart.svg" />
                <span>
                  {musicList?.filter((item: any) => item?.email === user?.email)
                    ?.length !== 0 &&
                  musicList?.filter((item: any) => item?.email === user?.email)
                    ?.length !== undefined
                    ? musicList
                        ?.filter((i: any) => i?.email === user?.email)
                        ?.map((a: any) => a?.likeCount)
                        ?.reduce((sum: number, currValue: number) => {
                          return sum + currValue;
                        })
                    : "0"}
                </span>
              </div>
              <div className="download-count count">
                <SVG src="/svg/download.svg" />
                <span>
                  {musicList?.filter((item: any) => item?.email === user?.email)
                    ?.length !== 0 &&
                  musicList?.filter((item: any) => item?.email === user?.email)
                    ?.length !== undefined
                    ? musicList
                        ?.filter((i: any) => i?.email === user?.email)
                        ?.map((a: any) => a?.downloadCount)
                        ?.reduce((sum: number, currValue: number) => {
                          return sum + currValue;
                        })
                    : "0"}
                </span>
              </div>
              <div className="my-registered-count count">
                <FontAwesomeIcon
                  icon={iconMyMusic}
                  onClick={(e: any) => {
                    e.preventDefault();
                  }}
                />
                <span>
                  {
                    musicList?.filter((i: any) => i?.email === user?.email)
                      ?.length
                  }
                </span>
              </div>
            </div>
          </SimplePrpfileContainer>
        )}
      </HeaderContainer>
      {loginStateDate?.isJoin && (
        <Overlay>
          <Join></Join>
        </Overlay>
      )}
      {loginStateDate?.isLogin && (
        <Overlay>
          <Login></Login>
        </Overlay>
      )}
      {isAddMusic && <AddMusic></AddMusic>}
    </>
  );
};

export default Header;
