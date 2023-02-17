import { textareaPorps } from "./interface";
import { TextareaContainer } from "./style";

const Textarea = ({ className, name, value, onChange }: textareaPorps) => {
  return (
    <TextareaContainer
      className={className}
      name={name}
      value={value}
      onChange={onChange}
    ></TextareaContainer>
  );
};

export default Textarea;
