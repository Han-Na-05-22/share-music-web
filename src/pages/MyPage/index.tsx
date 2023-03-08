import { musicListState } from "components/AddMusic/state";
import { userInfo } from "components/Login/state";
import Pagination from "components/Pagination";
import Tabel from "components/Table";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MyPageContainer } from "./style";
import SVG from "react-inlinesvg";

// todo : 내정보(아이디 제외하고 모두 수정 가능! 단 사용중인 닉네임이 있을 경우 중복된 닉네임 안내 모달 창 띄워주기), 내음악(수정, 삭제 가능하게), 플레이리스트(드래그 앤 드롭 기능 및 삭제 가능하게)

const MyPage = () => {
  const [musicList, setMusicList] = useRecoilState<any>(musicListState);
  const [user, setUser] = useRecoilState<any>(userInfo);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;
  // todo : 공통함수
  const handleChangePage = (page: any) => {
    if (musicList?.length < 10) {
      page = 1;
      return setPage(page);
    } else {
      return;
    }
  };

  return (
    <MyPageContainer>
      <div className="tabel-container">
        <Tabel
          tableBtnText={"내 음악"}
          theadData={[
            {
              title: "순위",
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
              title: <SVG src="/svg/heart.svg" />,
            },
            {
              title: <SVG src="/svg/download.svg" />,
            },
          ]}
        >
          {musicList?.length !== undefined ? (
            musicList
              ?.slice(offset, offset + limit)
              ?.map((item: any, idx: number) => (
                <tr key={idx} onClick={() => {}}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={item?.img} alt="" />
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.singer}</td>
                  <td>{item?.likeCount}</td>
                  <td>{item?.downloadCount}</td>
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
    </MyPageContainer>
  );
};

export default MyPage;
