import { OverlayProps } from "./interface";
import { OverlayContainer } from "./style";

const Overlay = ({ className, children }: OverlayProps) => {
  return <OverlayContainer>{children}</OverlayContainer>;
};

export default Overlay;
