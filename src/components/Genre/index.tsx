import Button from "components/Button";
import { userInfo } from "components/Login/state";
import { selectFilterState } from "pages/MusicTable/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GenreList } from "utility/data";
import { GenreProps } from "./interface";
import { genreState } from "./state";
import { GenreContainer } from "./style";

const Genre = ({ className, onClick }: GenreProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<any>(userInfo);

  const [isGenre, setIsGenre] = useRecoilState<any>(genreState);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  return (
    <GenreContainer className={className}>
      <strong className="title">장르</strong>
      <div className="genre-list-container">
        {GenreList?.map((item: any, idx: number) => (
          <Button
            key={idx}
            onClick={() => {
              !user?.email
                ? alert("로그인 후 이용해주세요.")
                : setIsGenre(item?.name);
              setSelectFilter(item?.name);
              navigate("/musicTable");
            }}
            width="100px"
            btnType="submit"
          >
            {item?.name}
          </Button>
        ))}
      </div>
    </GenreContainer>
  );
};

export default Genre;
