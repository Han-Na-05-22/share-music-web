import AddMusic from "components/AddMusic";
import { myMusicAddState } from "components/AddMusic/state";
import Button from "components/Button";
import SVG from "react-inlinesvg";
import { useRecoilState } from "recoil";
import { HeaderContainer } from "./style";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [isAddMusic, setIsAddMuisc] = useRecoilState<boolean>(myMusicAddState);
  return (
    <>
      <HeaderContainer>
        <h1 onClick={() => navigate("/")}>
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
      {isAddMusic && <AddMusic></AddMusic>}
    </>
  );
};

export default Header;
