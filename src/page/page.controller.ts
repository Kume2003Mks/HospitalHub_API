import { Controller, Get, Param, Req } from '@nestjs/common';
import { PageService } from './page.service';
import { Request } from 'express';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  @Get(':id')
  findOne(@Param('id') route: string, @Req() req: Request) {
    return this.pageService.findOne(route, req);
  }


}
