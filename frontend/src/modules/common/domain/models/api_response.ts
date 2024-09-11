import { AxiosResponse } from 'axios';
import { PaginatedData } from './paginated_data';


export class ChatApiResponse<T> {
  public readonly data: T;
  public readonly statusCode: number;
  public readonly error?: string;

  constructor(data: T, status: number, error?: string) {
    this.data = data;
    this.statusCode = status;
    this.error = error;
  }

  static fromClientResponse<T>(response: AxiosResponse): ChatApiResponse<T> {
    return new this(response.data.data, response.data.statusCode, response.data.error);
  }

  get didSucceed(): boolean {
    return this.statusCode >= 200 && this.statusCode < 300;
  }

  get isDataPaginated(): boolean {
    return this.data instanceof PaginatedData;
  }
}
