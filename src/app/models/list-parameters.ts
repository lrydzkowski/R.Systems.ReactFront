export interface IListParameters {
  page: number;
  pageSize: number;
  sortingFieldName: string;
  sortingOrder: string;
  searchQuery: string | null;
}

export class SortingOrder {
  public static readonly ascending = "asc";
  public static readonly descending = "desc";
}
