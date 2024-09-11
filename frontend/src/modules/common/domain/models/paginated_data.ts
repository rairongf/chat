export class PaginatedData<T> {
  constructor(
    public readonly elements: T[],
    public readonly totalElements: number,
    public readonly totalPages: number,
    public readonly currentPage: number
  ) {}
}
