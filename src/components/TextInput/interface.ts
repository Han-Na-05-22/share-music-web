export interface TextInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string | undefined;
  width?: string;
  height?: string;
  isError?: boolean;
  accept?: string;
  placeholder?: string;
  errorMsg?: string;
  label?: string;
  type?: string;
  fontSize?: string;
}

export interface TextInputStyleProps {
  width?: string;
  height?: string;
  isError?: boolean;
  errorMsg?: string;
  fontSize?: string;
}
