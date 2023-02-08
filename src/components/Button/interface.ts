export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
}

export interface ButtonStyleProps {
  width?: string;
  height?: string;
  fontSize?: string;
}
