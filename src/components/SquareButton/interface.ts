export interface SquareButtonProps {
  className?: string;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SquareButtonStyleProps {
  disabled?: boolean;
  active?: boolean;
}
