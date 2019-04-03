import { ServerError, ServerResponse } from 'src/types';
import { HttpStatus } from '@nestjs/common';

export class ServerErrorResponse implements ServerResponse<ServerError> {
  status: boolean;
  body: ServerError;
  constructor(message: any, httpStatus?: HttpStatus, status: boolean = false) {
    this.status = status;
    this.body = new ServerError(message, httpStatus);
  }
}
