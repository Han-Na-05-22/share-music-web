import Overlay from "components/Overlay";
import { PopUpPorps } from "./interface";
import { PopUpContainer } from "./style";

// todo : 회원가입 or 음원등록, 수정, 자세히보기

const PopUp = ({
  className,
  width = "1150px",
  height = "780px",
  children,
  isJoin = undefined,
}: PopUpPorps) => {
  console.log("isJoin", isJoin);
  return (
    <Overlay>
      <PopUpContainer
        className={className}
        width={width}
        height={height}
        isJoin={isJoin}
      >
        {children}
      </PopUpContainer>
    </Overlay>
  );
};

export default PopUp;
