import { BaseRepository } from '.';
import { PaginatedData } from '../../domain';

export type PaginatedRepositoryArguments<A = object> = A & {
  /// The page number to return.
  ///
  /// Default: 1
  page: number;

  /// The number of items to return per page.
  ///
  /// Default: 20
  /// Min: 10
  /// Max: 50
  limit: number;
};

export type PaginatedRepository<T, A = unknown> = BaseRepository<
  PaginatedData<T>,
  PaginatedRepositoryArguments<A>
>;