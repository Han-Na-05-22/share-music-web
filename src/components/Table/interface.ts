interface theadData {
  title: any;
}

export interface TabelProps {
  className?: string;
  children: React.ReactNode;
  theadData: theadData[];
}
