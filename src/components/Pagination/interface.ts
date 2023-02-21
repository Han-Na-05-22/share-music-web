export interface PaginationProps {
  total?: undefined | number;
  limit?: undefined | number;
  page?: number;
  setPage?: any;
  handleChangePage?: (page: any) => void | undefined;
}
