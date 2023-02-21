export interface ImgUploadProps {
  width?: string;
  height?: string;
  className?: string;
  value?: string;
  name: string;
  file: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  isError?: boolean;
}

export interface ImgUploadStyleProps {
  width?: string;
  height?: string;
  isError?: boolean;
}
