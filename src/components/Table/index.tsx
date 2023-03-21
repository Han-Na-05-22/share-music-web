import Button from "components/Button";
import { userInfo } from "components/Login/state";
import { selectFilterState } from "pages/MusicTable/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TabelProps } from "./interface";
import { TabelContainer, TableGroupContainer } from "./style";
import * as functions from "../../common/functions";
import { musicListState } from "components/AddMusic/state";
import { useQuery } from "react-query";

// todo : 테스트 길이가 길 경우 말줄임 적용

const Tabel = ({
  className,
  children,
  theadData,
  tableBtnText,
}: TabelProps) => {
  const [user, setUser] = useRecoilState<any>(userInfo);
  const navigate = useNavigate();
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);

  const { isLoading, error, data } = useQuery<any>(
    "getFirestoreMusicListDataList",
    () => {
      functions?.getMusicListDataFunction(setMusicList);
    }
  );

  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  return (
    <TableGroupContainer>
      <Button
        className="table-header-btn"
        height="60px"
        btnType="submit"
        onClick={() => {
          !user?.email
            ? alert("로그인 후 이용해주세요"!)
            : navigate("/musicTable");
          setSelectFilter(tableBtnText);
        }}
      >
        {tableBtnText}
      </Button>
      <TabelContainer className={className}>
        <thead>
          <tr>
            {theadData?.map((item: any, idx: number) => (
              <th key={idx}>{item?.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </TabelContainer>
    </TableGroupContainer>
  );
};

export default Tabel;
