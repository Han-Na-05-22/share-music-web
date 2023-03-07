import Button from "components/Button";
import { GenreList } from "utility/data";
import { GenreProps } from "./interface";
import { GenreContainer } from "./style";

const Genre = ({ className }: GenreProps) => {
  return (
    <GenreContainer className={className}>
      <strong className="title">장르</strong>
      <div className="genre-list-container">
        {GenreList?.map((item: any, idx: number) => (
          <Button key={idx} onClick={() => {}} width="100px" btnType="submit">
            {item?.name}
          </Button>
        ))}
      </div>
    </GenreContainer>
  );
};

export default Genre;
