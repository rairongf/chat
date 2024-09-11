
export type BaseUsecase<T = void, A = object> = (args: A) => Promise<T>;
