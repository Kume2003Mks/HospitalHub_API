import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from 'src/entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';


@Injectable()
export class PageService {

  constructor(
    @InjectRepository(Page)
    private readonly PageRepository: Repository<Page>,
  ) { }

  async findOne(route: string, req: Request) {
    const page = await this.PageRepository.findOne({
      where: { route: route },
    });
    if (!page) {
      throw new NotFoundException(`Promotion with id ${route} not found`);
    }
    const baseUrl = req.protocol + '://' + req.get('host');
    page.cover = `${baseUrl}${page.cover}`;
    return page;
  }

  async update(route: string, updatePageDto: UpdatePageDto) {
    const page = await this.PageRepository.findOne({ where: { route: route }, });
    if (!page) {
      throw new NotFoundException('page record not found');
    }

    const url = new URL(updatePageDto.cover);
    const filename = url.pathname;

    updatePageDto.cover = filename;

    Object.assign(page, updatePageDto);

    await this.PageRepository.save(page);
  }

}
