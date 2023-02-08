import { ContainerProps } from "./interface";
import { RootContainer } from "./style";
const Container = ({ children, className }: ContainerProps) => {
  return <RootContainer className={className}>{children}</RootContainer>;
};

export default Container;
