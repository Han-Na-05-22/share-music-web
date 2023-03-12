import { musicListState } from "components/AddMusic/state";
import Tabel from "components/Table";
import { useRecoilState } from "recoil";
import { MusicTableContainer } from "./style";
import SVG from "react-inlinesvg";
import { useState } from "react";
import Pagination from "components/Pagination";
import { selectFilterState } from "./state";
import CheckBox from "components/CheckBox";
import TextInput from "components/TextInput";
import Button from "components/Button";
const MusicTable = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [selectFilter, setSelectFilter] =
    useRecoilState<string>(selectFilterState);
  const offset = (page - 1) * limit;
  console.log("selectFilter", selectFilter);

  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };
  return (
    <MusicTableContainer>
      <div className="music-top">
        <div className="search">
          <TextInput
            width="220px"
            name="search"
            value={""}
            label=""
            onChange={(e) => {}}
          ></TextInput>
          <Button
            fontSize="18px"
            className="my-info-submit"
            btnType="submit"
            onClick={() => {}}
          >
            검색
          </Button>
        </div>

        <Button
          className="my-info-submit"
          fontSize="16px"
          btnType="submit"
          onClick={() => {}}
        >
          플레이리스트 추가
        </Button>
      </div>
      <div className="tabel-container">
        <Tabel
          tableBtnText={selectFilter}
          theadData={[
            {
              title: "",
            },
            {
              title: selectFilter === "TOP" ? "순위" : "순번",
            },
            {
              title: "음원",
            },
            {
              title: "제목",
            },
            {
              title: "가수",
            },
            {
              title: "장르",
            },
            {
              title: <SVG src="/svg/heart.svg" />,
            },
            {
              title: <SVG src="/svg/download.svg" />,
            },
            {
              title: "소유자",
            },
            {
              title: "등록일",
            },
            {
              title: "",
            },
          ]}
        >
          {musicList?.length !== undefined ? (
            musicList
              ?.slice(offset, offset + limit)
              ?.sort((a: any, b: any) => b?.likeCount - a?.likeCount)
              ?.map((item: any, idx: number) => (
                <tr key={idx} onClick={() => {}}>
                  <td>
                    <CheckBox
                      onChange={() => {}}
                      name="checked"
                      value={true}
                      checked={true}
                    ></CheckBox>
                  </td>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>{item?.genre}</td>
                  <td>{item?.likeCount}</td>
                  <td>{item?.downloadCount}</td>
                  <td>{item?.email?.split("@")[0]}</td>
                  <td>{item?.date}</td>
                  <td>
                    <SVG src="/svg/term_heart.svg" />,
                  </td>
                </tr>
              ))
          ) : (
            <p className="no-data">등록된 데이터가 없습니다.</p>
          )}
        </Tabel>
        <Pagination
          total={musicList.length}
          limit={limit}
          page={page}
          setPage={setPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </MusicTableContainer>
  );
};

export default MusicTable;
