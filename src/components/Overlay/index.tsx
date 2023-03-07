import { OverlayProps } from "./interface";
import { OverlayContainer } from "./style";

const Overlay = ({ className, children }: OverlayProps) => {
  return <OverlayContainer className={className}>{children}</OverlayContainer>;
};

export default Overlay;
