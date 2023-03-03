import { textareaPorps } from "./interface";
import { TextareaContainer } from "./style";

const Textarea = ({
  className,
  name,
  value,
  onChange,
  label = "설명",
  width = "800px",
  height = "100px",
  isError = false,
  errorMsg,
}: textareaPorps) => {
  return (
    <TextareaContainer
      className={className}
      width={width}
      height={height}
      isError={isError}
    >
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        id={name}
        onChange={onChange}
      ></textarea>
      <p>{errorMsg}</p>
    </TextareaContainer>
  );
};

export default Textarea;
