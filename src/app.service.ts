import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndexFile(): string {
    return 'index.html';
  }
}
