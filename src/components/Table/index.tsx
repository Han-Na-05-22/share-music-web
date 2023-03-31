import { TabelProps } from "./interface";
import { TabelContainer, TableGroupContainer } from "./style";

// todo : 테스트 길이가 길 경우 말줄임 적용
const Tabel = ({ className, children, theadData }: TabelProps) => {
  return (
    <TableGroupContainer>
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
    </TableGroupContainer>
  );
};

export default Tabel;
