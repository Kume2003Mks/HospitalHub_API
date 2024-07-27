import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { NewsService } from './news.service';
import { Request } from 'express';

@Controller('news')
export class NewsController {
  constructor(private readonly publishService: NewsService) { }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') pageSize: number = 21,
    @Query('search') search: string,
    @Req() req: Request

  ) {
    if (search) {
      return this.publishService.search(search, req);
    } else {
      return this.publishService.findAll(page, pageSize, req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request, @Query('preview') preview: string = 'false') {

    const sessionKey = `viewedNews-${id}`;
    const isPreview = preview === 'false';

    // ตรวจสอบว่ามีการเข้าชมในเซสชั่นหรือไม่
    if (!req.session[sessionKey] && isPreview) {
      this.publishService.incrementViews(+id);
      req.session[sessionKey] = true;
    }
    return this.publishService.findOne(+id, req);
  }

}
