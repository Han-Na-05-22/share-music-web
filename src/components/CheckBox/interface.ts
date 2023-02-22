export interface CheckBoxProps {
  className?: string;
  name: string;
  checked: boolean;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
