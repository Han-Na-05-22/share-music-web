import AddMusic from "components/AddMusic";
import { myMusicAddState } from "components/AddMusic/state";
import Button from "components/Button";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { useRecoilState } from "recoil";
import { HeaderContainer } from "./style";

const Header = () => {
  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  return (
    <>
      <HeaderContainer>
        <h1>
          <span>MS</span>
          <SVG src="/svg/logo-svg.svg" />
          <span>Music</span>
        </h1>
        <Button
          height="90px"
          btnType="add"
          width="240px"
          onClick={() => setIsAddMuisc(true)}
        >
          음원 등록
        </Button>
      </HeaderContainer>
      {isAddMusic && <AddMusic>d</AddMusic>}
    </>
  );
};

export default Header;
