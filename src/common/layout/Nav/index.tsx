import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";
import {
  faN,
  faHouse,
  faMusic,
  faFire,
  faUsers,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRecoilState } from "recoil";
import { navState } from "./state";
import { selectFilterState } from "pages/MusicTable/state";
import { myMusicPlayListState } from "pages/MyPage/state";

const Nav = () => {
  const navigate = useNavigate();

  const [myMusicPlayList, setMyMusicPlayList] =
    useRecoilState<any>(myMusicPlayListState);

  const iconHouse = faHouse as IconProp;
  const iconPopular = faFire as IconProp;
  const iconNew = faN as IconProp;
  const iconArtist = faUsers as IconProp;
  const iconMyMusic = faMusic as IconProp;
  const iconPlayList = faRectangleList as IconProp;

  const iconArray = [
    iconHouse,
    iconNew,
    iconPopular,
    iconArtist,
    iconMyMusic,
    iconPlayList,
  ];
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  console.log("selectFilter", selectFilter);
  const [navData, setNavData] = useRecoilState<any[]>(navState);

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

            navigate(`${item?.nav}`);
            setSelectFilter(item?.name);
          }}
          key={idx}
          className={item?.isClicked ? "active-nav" : ""}
        >
          {/* <FontAwesomeIcon
            icon={iconArray[idx]}
            onClick={(e: any) => {
              e.preventDefault();
            }}
          /> */}
          <span>{item?.name}</span>
        </div>
      ))}
    </NavContainer>
  );
};

export default Nav;
