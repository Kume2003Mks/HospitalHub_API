import { Controller, Get, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { PageService } from './page.service';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';


@UseGuards(JwtAuthGuard)
@Controller('admin/page')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  @Get(':id')
  findOne(@Param('id') route: string, @Req() req: Request) {
    return this.pageService.findOne(route, req);
  }

  @Patch(':id')
  update(@Param('id') route: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(route, updatePageDto);
  }

}
