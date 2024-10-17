export type ICompanyProps = {
  id: string;
  name: string;
  industry?: string;
  location?: string;
  founded?: number | string;
}

export interface IGetRequest<T> {
  list: T[];
  totalCount: number;
}

