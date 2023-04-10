import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";
import { useRecoilState } from "recoil";
import { navState } from "./state";
import {
  addMusicPlayerState,
  filterMusicListState,
  searchFilterState,
  selectFilterState,
} from "pages/MusicTable/state";
import { filterGenreState, searchInputState } from "components/TextInput/state";
import { MusicFormProps } from "components/AddMusic/interface";
import { musicListState } from "components/AddMusic/state";

const Nav = () => {
  const navigate = useNavigate();
  const [filterMusicList, setFilterMusicList] =
    useRecoilState<MusicFormProps[]>(filterMusicListState);
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [searchFilter, setSearchFilter] =
    useRecoilState<boolean>(searchFilterState);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);

  const [navData, setNavData] = useRecoilState<any[]>(navState);

  const [search, setSearch] = useRecoilState<string>(searchInputState);
  const [filterGenre, setFilterGenre] =
    useRecoilState<string>(filterGenreState);
  const [addMusicPlayer, setAddMusicPlayer] =
    useRecoilState<any[]>(addMusicPlayerState);

  return (
    <NavContainer>
      {navData?.map((item: any, idx: number) => (
        <div
          onClick={async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            await setNavData(
              navData?.map((p) =>
                p.name === item?.name
                  ? { ...p, isClicked: true }
                  : { ...p, isClicked: false },
              ),
            );

            await setSelectFilter(item?.name);
            setSearchFilter(false);
            setSearch("");
            setFilterGenre("All");
            setAddMusicPlayer([]);
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
