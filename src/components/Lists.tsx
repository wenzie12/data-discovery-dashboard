import { ReactNode } from "react";

type TTableListProps<T> = {
  data: T[];
  renderItem: (item: T) => ReactNode;
};

export default function Lists<T>({
  data,
  renderItem,
}: TTableListProps<T>) {  
  if (!data?.length) return null
  return <>{data?.map((item) => renderItem(item))}</>;
}
