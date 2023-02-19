import SquareButton from "components/SquareButton";
import SVG from "react-inlinesvg";
import { PaginationProps } from "./interface";
import { StyledPagination } from "./style";

const Pagination = ({
  nowPage,
  totalPages,
  onChangePageNo,
  onChangePageRange,
}: PaginationProps) => {
  return (
    <>
      <StyledPagination>
        <SquareButton
          disabled={nowPage < 11 && nowPage >= 1}
          onClick={() => {
            onChangePageRange(Math?.ceil(nowPage / 7) * 7 - 7);
          }}
        >
          <SVG src="/svg/page-prev.svg" />
        </SquareButton>
        {Array(totalPages)
          ?.fill(null)
          ?.map((_, idx) => idx + 1)
          ?.slice(
            (Math?.ceil(nowPage / 7) - 1) * 7,
            totalPages > 7 ? 7 * Math?.ceil(nowPage / 7) : totalPages
          )
          ?.map((el) => (
            <SquareButton
              active={el === nowPage}
              key={el}
              onClick={() => onChangePageNo(el)}
            >
              {el}
            </SquareButton>
          ))}

        <SquareButton
          disabled={Math?.ceil(nowPage / 7) === Math?.ceil(totalPages / 7)}
          onClick={() => onChangePageRange(Math?.ceil(nowPage / 7) * 7 + 1)}
        >
          <SVG src="/svg/page-next.svg" />
        </SquareButton>
      </StyledPagination>
    </>
  );
};

export default Pagination;
