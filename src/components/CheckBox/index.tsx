import { useEffect } from "react";
import { CheckBoxProps } from "./interface";
import { CheckBoxContainer } from "./style";

const CheckBox = ({
  className,
  name,
  checked,
  value,
  disabled,
  onChange,
  onClick,
}: CheckBoxProps) => {
  return (
    <CheckBoxContainer className={className} onClick={onClick}>
      <input
        disabled={disabled}
        type="checkbox"
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        checked={checked}
      />
      <label
        htmlFor={name}
        className={disabled ? "disabled-label" : "label"}
      ></label>
    </CheckBoxContainer>
  );
};

export default CheckBox;
