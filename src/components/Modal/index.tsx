import Overlay from "components/Overlay";
import { ModalProps } from "./interface";
import { ModalContainer } from "./style";

const Modal = ({ className }: ModalProps) => {
  return (
    <Overlay>
      <ModalContainer>Modal</ModalContainer>
    </Overlay>
  );
};

export default Modal;
