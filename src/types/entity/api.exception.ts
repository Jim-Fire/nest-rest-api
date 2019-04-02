import { HttpStatus } from '@nestjs/common';

export interface ServerError {
  status: HttpStatus;
  message: any;
}

export class ServerError implements ServerError {
  status: HttpStatus;
  message: any;
  constructor(message: any, status: HttpStatus) {
    this.message = message;
    this.status = status;
  }
}
