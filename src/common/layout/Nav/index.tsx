import { useNavigate } from 'react-router-dom';
import { NavContainer } from './style';
import { useRecoilState } from 'recoil';
import { navState } from './state';
import { addMusicPlayerState, selectFilterState } from 'pages/MusicTable/state';
import { filterGenreState, searchInputState } from 'components/TextInput/state';

const Nav = () => {
  const navigate = useNavigate();

  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);

  const [navData, setNavData] = useRecoilState<any[]>(navState);

  const [search, setSearch] = useRecoilState<string>(searchInputState);
  const [filterGenre, setFilterGenre] =
    useRecoilState<string>(filterGenreState);
  const [addMusicPlayer, setAddMusicPlayer] =
    useRecoilState<Array<number>>(addMusicPlayerState);

  return (
    <NavContainer>
      {navData?.map(
        (
          item: { name: string; nav: string; isClicked: boolean },
          idx: number,
        ) => (
          <div
            onClick={() => {
              setNavData(
                navData?.map(
                  (p: { name: string; nav: string; isClicked: boolean }) =>
                    p.name === item?.name
                      ? { ...p, isClicked: true }
                      : { ...p, isClicked: false },
                ),
              );
              setSelectFilter(item?.name);
              setSearch('');
              setFilterGenre('All');
              setAddMusicPlayer([]);
              navigate(`${item?.nav}`);
            }}
            key={idx}
            className={item?.isClicked ? 'active-nav' : ''}
          >
            <span>{item?.name}</span>
          </div>
        ),
      )}
    </NavContainer>
  );
};

export default Nav;
