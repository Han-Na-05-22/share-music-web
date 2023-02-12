export interface TextInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  width?: string;
  height?: string;
  isError?: boolean;
  errorMsg?: string;
  label: string;
}

export interface TextInputStyleProps {
  width?: string;
  height?: string;
  isError?: boolean;
  errorMsg?: string;
}
