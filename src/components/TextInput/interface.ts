export interface TextInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string | undefined;
  width?: string;
  height?: string;
  isError?: boolean;
  errorMsg?: string;
  label?: string;
  children?: React.ReactNode;
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
