import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('admin/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get()
  findAll(
    @Query('search') search: string,
    @Req() req: Request
  ) {
    if (search) {
      return this.newsService.search(search, req);
    } else {
      return this.newsService.findAll(req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.newsService.findOne(+id, req);
  }

  @Post()
  create(
    @Body() createNewsDto: CreateNewsDto,
  ) {
    return this.newsService.create(createNewsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
