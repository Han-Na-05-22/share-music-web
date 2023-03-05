import { PlayListProps } from "./interface";
import { PlayListContainer } from "./style";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const PlayList = ({ className, children, playListData }: PlayListProps) => {
  return (
    <PlayListContainer className={className}>
      {playListData?.length !== 0
        ? playListData?.map((item: any) => (
            <div className="paly-list-container">
              <AudioPlayer
                // autoPlay
                src={item?.url}
                onPlay={(e) => console.log("onPlay")}
              />
              <strong>{item?.meta?.customMetadata?.title}</strong>
              <strong>{item?.meta?.customMetadata?.singer}</strong>
            </div>
          ))
        : "등록된 음악이 없습니다."}
    </PlayListContainer>
  );
};

export default PlayList;
