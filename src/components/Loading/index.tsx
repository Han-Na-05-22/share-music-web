import { LoadingPorps } from "./interface";
import { LoadingContainer } from "./style";

const Loading = ({ className }: LoadingPorps) => {
  return (
    <LoadingContainer className={className}>
      <div className="box-1 box"></div>
      <div className="box-2 box"></div>
      <div className="box-3 box"></div>
    </LoadingContainer>
  );
};

export default Loading;
