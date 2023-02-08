import Button from "components/Button";
import SVG from "react-inlinesvg";
import { HeaderContainer } from "./style";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>
        <span>MS</span>
        <SVG src="/svg/logo-svg.svg" />
        <span>Music</span>
      </h1>
      <Button height="90px" width="240px">
        음원 등록
      </Button>
    </HeaderContainer>
  );
};

export default Header;
