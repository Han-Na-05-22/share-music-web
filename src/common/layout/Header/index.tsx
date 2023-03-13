import AddMusic from "components/AddMusic";
import { musicListState, myMusicAddState } from "components/AddMusic/state";
import Button from "components/Button";
import SVG from "react-inlinesvg";
import { useRecoilState } from "recoil";
import { HeaderContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { userInfo } from "components/Login/state";
import * as functions from "../../functions";
import { selectFilterState } from "pages/MusicTable/state";
import { useEffect } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);

  useEffect(() => {
    if (selectFilter === "") {
      functions.getMusicListDataFunction(setMusicList);
    }
  }, [selectFilter]);

  return (
    <>
      <HeaderContainer>
        <h1
          onClick={async () => {
            await setSelectFilter("");
            navigate("/");
          }}
        >
          <span>MS</span>
          <SVG src="/svg/logo-svg.svg" />
          <span>Music</span>
        </h1>
        <Button
          height="75px"
          btnType="add"
          width="200px"
          onClick={() => {
            !user?.email
              ? alert("로그인 후 이용해주세요")
              : setIsAddMuisc(true);
          }}
        >
          음원 등록
        </Button>
      </HeaderContainer>
      {isAddMusic && <AddMusic></AddMusic>}
    </>
  );
};

export default Header;
