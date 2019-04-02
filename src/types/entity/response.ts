export interface IServerResponse<T> {
  status: boolean;
  body: T;
}

export class ServerResponse<T> implements IServerResponse<T> {
  status: boolean;
  body: T;
  constructor(body: T, status: boolean) {
    this.status = status;
    this.body = body;
  }
}

