import Overlay from "components/Overlay";
import { PopUpPorps } from "./interface";
import { PopUpContainer } from "./style";

const PopUp = ({
  className,
  width = "1150px",
  height = "780px",
  children,
}: PopUpPorps) => {
  return (
    <Overlay>
      <PopUpContainer className={className} width={width} height={height}>
        {children}
      </PopUpContainer>
    </Overlay>
  );
};

export default PopUp;
