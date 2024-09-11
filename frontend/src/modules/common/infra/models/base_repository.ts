import { ChatApiResponse } from "../../domain";


export type BaseRepository<T, A = unknown> = (args: A) => Promise<ChatApiResponse<T>>;
