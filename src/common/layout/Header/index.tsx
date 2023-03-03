import AddMusic from "components/AddMusic";
import Button from "components/Button";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { HeaderContainer } from "./style";

const Header = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
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
          onClick={() => setIsClicked(true)}
        >
          음원 등록
        </Button>
      </HeaderContainer>
      {isClicked && <AddMusic>d</AddMusic>}
    </>
  );
};

export default Header;
