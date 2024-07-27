import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/entities/page.entity';
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

}
