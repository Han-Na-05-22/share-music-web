import { TabelProps } from "./interface";
import { TabelContainer } from "./style";

// todo : 페이지네이션  최대 7열 이후에는 다음 페이지로

const Tabel = ({
  className,
  children,
  theadData,
  totalPages,
  nowPage,
  onChangePageRange,
  onChangePageNo,
}: TabelProps) => {
  return (
    <TabelContainer className={className}>
      <thead>
        <tr>
          {theadData?.map((item: any, idx: number) => (
            <th key={idx}>{item?.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TabelContainer>
  );
};

export default Tabel;
