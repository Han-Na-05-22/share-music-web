export interface SquareButtonProps {
  className?: string;
  disabled?: any;
  active?: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SquareButtonStyleProps {
  disabled?: boolean;
  active?: boolean;
}
