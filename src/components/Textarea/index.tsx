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
}: textareaPorps) => {
  return (
    <TextareaContainer className={className} width={width} height={height}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        id={name}
        onChange={onChange}
      ></textarea>
    </TextareaContainer>
  );
};

export default Textarea;
