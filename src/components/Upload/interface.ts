export interface UploadProps {
  className?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  name: string;
  file: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface UploadStyleProps {
  width?: string;
  height?: string;
}
