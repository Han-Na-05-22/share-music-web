import { BoxProps } from "./interface";
import { BoxContainer } from "./style";

const Box = ({
  children,
  className,
  height = "780px",
  width = "550px",
}: BoxProps) => {
  return (
    <BoxContainer className={className} height={height} width={width}>
      {children}
    </BoxContainer>
  );
};

export default Box;
