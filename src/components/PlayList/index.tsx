import { PlayListProps } from "./interface";
import { PlayListContainer } from "./style";

const PlayList = ({ className, children, playListData }: PlayListProps) => {
  return (
    <PlayListContainer className={className}>
      {playListData?.length !== 0
        ? playListData?.map((item: any) => (
            <div className="paly-list-container">
              <audio src={item?.url} autoPlay></audio>
            </div>
          ))
        : "등록된 음악이 없습니다."}
    </PlayListContainer>
  );
};

export default PlayList;
