import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { FSPath } from 'src/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    return res.sendFile(this.appService.getIndexFile(), { root: FSPath.CLIENT });
  }
}
