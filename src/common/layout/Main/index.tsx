import { MainProps } from "./interface";
import { MainContainer } from "./style";
const Main = ({ children, className }: MainProps) => {
  return <MainContainer className={className}>{children}</MainContainer>;
};

export default Main;
