import { BasicSelectPorps } from "./interface";
import { BasicSelectContainer } from "./style";

export default function BasicSelect({
  className,
  onChange,
  name,
  value,
  onClick,
  selectData,
}: BasicSelectPorps) {
  return (
    <BasicSelectContainer
      onClick={onClick}
      className={className}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    >
      {selectData?.map((item: any, idx: number) => (
        <option value={item?.name} key={idx}>
          {item?.name}
        </option>
      ))}
    </BasicSelectContainer>
  );
}
