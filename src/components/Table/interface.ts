interface theadData {
  title: any;
}

// todo : 추후 total, now, pageNo, pageRange 필수 입력으로 변경 예정
export interface TabelProps {
  className?: string;
  children: React.ReactNode;
  theadData: theadData[];
  totalPages?: number;
  nowPage?: number;
  onChangePageNo?: (no: number) => void;
  onChangePageRange?: (page: number) => void;
}
