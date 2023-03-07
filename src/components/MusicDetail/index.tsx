import Button from "components/Button";
import Overlay from "components/Overlay";
import Record from "components/Record";
import { useRecoilState } from "recoil";
import { MusicDetailProps } from "./interface";
import { isMusicDetailState } from "./state";
import { MusicDetailContainer } from "./style";

const MusicDetail = ({
  className,
  width = "800px",
  height = "750px",
  detailData,
}: MusicDetailProps) => {
  console.log("detailData", detailData);
  const [isDetailData, setIsDetailData] =
    useRecoilState<any>(isMusicDetailState);
  return (
    <Overlay>
      <MusicDetailContainer className={className} width={width} height={height}>
        <Record></Record>
        <Button
          btnType={"submit"}
          onClick={async () => {
            setIsDetailData(false);
          }}
        >
          확인
        </Button>
      </MusicDetailContainer>
    </Overlay>
  );
};

export default MusicDetail;
