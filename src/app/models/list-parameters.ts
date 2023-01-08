export interface ListParameters {
  pagination: Pagination;
  sorting: Sorting;
  search: Search;
}

export interface Pagination {
  firstIndex: number;
  numberOfRows: number;
}

export interface Sorting {
  fieldName: string;
  order: SortingOrder;
}

export enum SortingOrder {
  Ascending = 0,
  Descending = 1,
}

export interface Search {
  query: string;
}
