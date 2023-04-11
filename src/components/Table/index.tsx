import { TabelProps } from "./interface";
import { TabelContainer, TableGroupContainer } from "./style";

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
