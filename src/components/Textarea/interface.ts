export interface textareaPorps {
  className?: string;
  name: string;
  value: string;
  width?: string;
  label?: string;
  height?: string;
  isError?: boolean;
  errorMsg?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface textareaStyleProps {
  width?: string;
  height?: string;
  isError?: boolean;
}
