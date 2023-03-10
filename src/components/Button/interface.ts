type buttonType =
  | "submit"
  | "edit"
  | "cancel"
  | "confirm"
  | "search"
  | "save"
  | "upload"
  | "download"
  | "add"
  | "none";

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
  btnType?: buttonType;
  marginLeft?: string;
}

export interface ButtonStyleProps {
  width?: string;
  height?: string;
  marginLeft?: string;
  fontSize?: string;
  btnType?: buttonType;
}
