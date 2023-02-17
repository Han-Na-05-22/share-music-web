import Button from "components/Button";
import Overlay from "components/Overlay";
import { ModalProps } from "./interface";
import { ModalContainer } from "./style";

const Modal = ({
  className,
  width = "550px",
  height = "300px",
  children,
}: ModalProps) => {
  return (
    <Overlay>
      <ModalContainer width={width} height={height} className={className}>
        <div className="modal-header"></div>
        {children}
        <Button btnType="confirm">버튼</Button>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
