export interface RecordProps {
  className?: string;
  width?: string;
  height?: string;
  isCircle?: boolean;
  isPlay?: boolean;
  onClickPlay?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface RecordStyleProps {
  width?: string;
  height?: string;
  isPlay?: boolean;
}
