import { OverlayProps } from "./interface";
import { OverlayContainer } from "./style";

const Overlay = ({ className, children }: OverlayProps) => {
  return <OverlayContainer>{children}오버레이</OverlayContainer>;
};

export default Overlay;
