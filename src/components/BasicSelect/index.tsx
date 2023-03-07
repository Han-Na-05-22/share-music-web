import SVG from "react-inlinesvg";
import { BasicSelectPorps } from "./interface";
import { BasicSelectContainer } from "./style";

export default function BasicSelect({
  className,
  onChange,
  name,
  selectData,
}: BasicSelectPorps) {
  return (
    <BasicSelectContainer
      className={className}
      name={name}
      id={name}
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
