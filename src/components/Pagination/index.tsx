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
      <StyledPagination></StyledPagination>
    </>
  );
};

export default Pagination;
