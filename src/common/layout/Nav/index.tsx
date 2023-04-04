import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";
import { useRecoilState } from "recoil";
import { navState } from "./state";
import { selectFilterState } from "pages/MusicTable/state";
import { filterGenreState, searchInputState } from "components/TextInput/state";

const Nav = () => {
  const navigate = useNavigate();

  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);

  const [navData, setNavData] = useRecoilState<any[]>(navState);

  const [search, setSearch] = useRecoilState<string>(searchInputState);
  const [filterGenre, setFilterGenre] =
    useRecoilState<string>(filterGenreState);

  return (
    <NavContainer>
      {navData?.map((item: any, idx: number) => (
        <div
          onClick={async (e: any) => {
            await setNavData(
              navData?.map((p) =>
                p.name === item?.name
                  ? { ...p, isClicked: true }
                  : { ...p, isClicked: false }
              )
            );
            await setSelectFilter(item?.name);
            setSearch("");
            setFilterGenre("All");
            navigate(`${item?.nav}`);
          }}
          key={idx}
          className={item?.isClicked ? "active-nav" : ""}
        >
          <span>{item?.name}</span>
        </div>
      ))}
    </NavContainer>
  );
};

export default Nav;
