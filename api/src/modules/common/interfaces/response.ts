export interface ChatResponse<T = object> {
  statusCode: number;
  data?: object | ChatPaginatedResponse<T>;
  error?: object;
}

export interface ChatPaginatedResponse<T> {
  elements: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
