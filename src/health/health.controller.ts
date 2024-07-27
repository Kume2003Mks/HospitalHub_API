import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { HealthService } from './health.service';
import { Request } from 'express';


@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) { }


  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('size') pageSize: number = 21,
    @Query('search') search: string,
    @Query('important') isImportant: string,
    @Req() req: Request
  ) {

    const isImportantHealth = isImportant === 'true'; // Check if isImportant is 'true' string
    if (isImportantHealth) {
      return this.healthService.findByImportance(page, pageSize, req);
    }
    if (search) {
      return this.healthService.search(search, req);
    } else {
      return this.healthService.findAll(page, pageSize, req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request, @Query('preview') preview: string = 'false') {
    const sessionKey = `viewedHealth-${id}`;
    const isPreview = preview === 'false';

    // ตรวจสอบว่ามีการเข้าชมในเซสชั่นหรือไม่
    if (!req.session[sessionKey] && isPreview) {
      this.healthService.incrementViews(+id);
      req.session[sessionKey] = true;
    }

    return this.healthService.findOne(+id, req);
  }

}
