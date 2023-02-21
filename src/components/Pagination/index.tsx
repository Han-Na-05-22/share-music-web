import SquareButton from "components/SquareButton";
import { useEffect } from "react";
import { PaginationProps } from "./interface";
import { PaginationContainer } from "./style";
import SVG from "react-inlinesvg";

const Pagination = ({
  total,
  limit,
  page = 1,
  setPage,
  handleChangePage,
}: PaginationProps) => {
  const numPages = total && limit ? Math?.ceil(total / limit) : 0;

  useEffect(() => {
    if (numPages === undefined || null || NaN) {
      return;
    }
  }, [numPages]);

  useEffect(() => {
    if (handleChangePage) {
      handleChangePage(page);
    }
  }, [handleChangePage, page]);
  return (
    <PaginationContainer>
      <SquareButton
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="prev-btn"
      >
        <SVG src="/svg/page-prev.svg" />
      </SquareButton>

      {Array(numPages)
        ?.fill(null)
        ?.map((_: any, idx: number) => (
          <SquareButton
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={idx + 1 === page ? "btn-num-active" : "btn-num"}
            active={idx + 1 === page}
          >
            {idx + 1}
          </SquareButton>
        ))}

      <SquareButton
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="next-btn"
      >
        <SVG src="/svg/page-next.svg" />
      </SquareButton>
    </PaginationContainer>
  );
};

export default Pagination;
