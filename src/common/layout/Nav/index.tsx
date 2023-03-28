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

const Nav = () => {
  const navigate = useNavigate();

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
            await setSelectFilter(item?.name);
            navigate(`${item?.nav}`);
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
