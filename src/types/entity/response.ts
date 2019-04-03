import { ServerError } from 'src/types';

export interface ServerResponse<T> {
  status: boolean;
  body: T;
}

export class ServerResponse<T> implements ServerResponse<T> {
  status: boolean;
  body: T;
  constructor(body: T, status: boolean = false) {
    this.status = status;
    this.body = body;
  }
}

export type PromisedResponse<T> = Promise<ServerResponse<T | ServerError>>;
