export interface ProfileImgProps {
  width?: string;
  height?: string;
  className?: string;
  value?: string;
  name: string;
  onClickDelete?: () => void;
  file: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  isError?: boolean;
}

export interface ProfileImgStyleProps {
  width?: string;
  height?: string;
  isError?: boolean;
}
