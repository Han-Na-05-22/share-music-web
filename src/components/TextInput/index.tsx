import { TextInputProps } from "./interface";
import { TextInputContainer } from "./style";

const TextInput = ({
  className,
  onChange,
  name,
  value,
  width,
  height,
  isError = false,
  errorMsg,
}: TextInputProps) => {
  return (
    <TextInputContainer className={className} width={width} height={height}>
      <label htmlFor={name}></label>

      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </TextInputContainer>
  );
};
export default TextInput;
