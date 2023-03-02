import { CheckBoxProps } from "./interface";
import { CheckBoxContainer } from "./style";

const CheckBox = ({
  className,
  name,
  checked,
  value,
  onChange,
  onClick,
}: CheckBoxProps) => {
  return (
    <CheckBoxContainer className={className} onClick={onClick}>
      <input
        type="checkbox"
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        checked={checked}
      />
      <label htmlFor={name}></label>
    </CheckBoxContainer>
  );
};

export default CheckBox;
