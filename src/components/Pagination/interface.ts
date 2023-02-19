// 버튼 색 theme 확인 필요
export interface PaginationProps {
  nowPage: number;
  totalPages: number;
  onChangePageNo: (no: number) => void;
  onChangePageRange: (page: number) => void;
}
