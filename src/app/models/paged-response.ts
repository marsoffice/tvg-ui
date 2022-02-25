export interface PagedResponse<T> {
  nextRowKey?: string;
  items: T[];
}
