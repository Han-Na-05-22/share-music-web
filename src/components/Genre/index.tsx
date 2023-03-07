import Button from "components/Button";
import { userInfo } from "components/Login/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GenreList } from "utility/data";
import { GenreProps } from "./interface";
import { genreState } from "./state";
import { GenreContainer } from "./style";

const Genre = ({ className, onClick }: GenreProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<any>(userInfo);
  console.log("user", user?.email);
  const [isGenre, setIsGenre] = useRecoilState<any>(genreState);
  console.log("isGenre", isGenre);
  return (
    <GenreContainer className={className}>
      <strong className="title">장르</strong>
      <div className="genre-list-container">
        {GenreList?.map((item: any, idx: number) => (
          <Button
            key={idx}
            onClick={() => {
              if (!user?.email) {
                alert("로그인 후 이용해주세요.");
              }

              setIsGenre(item?.name);
              navigate(`/music/${item?.name}`);
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
