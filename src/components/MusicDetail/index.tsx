import Button from "components/Button";
import Overlay from "components/Overlay";
import Record from "components/Record";
import { useRecoilState } from "recoil";
import { MusicDetailProps, MusicDetailStateProps } from "./interface";
import { isMusicDetailState } from "./state";
import { MusicDetailContainer } from "./style";

const MusicDetail = ({
  className,
  width = "800px",
  height = "750px",
  detailData,
}: MusicDetailProps) => {
  const [isDetailData, setIsDetailData] =
    useRecoilState<MusicDetailStateProps>(isMusicDetailState);

  return (
    <Overlay>
      <MusicDetailContainer className={className} width={width} height={height}>
        <Record></Record>
        <Button
          className="close-btn"
          btnType={"submit"}
          onClick={async () => {
            setIsDetailData({
              isDetail: false,
              isLocation: "",
            });
          }}
        >
          확인
        </Button>
      </MusicDetailContainer>
    </Overlay>
  );
};

export default MusicDetail;
