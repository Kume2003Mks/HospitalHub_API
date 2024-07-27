import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from 'src/entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private readonly NewsRepository: Repository<News>,
  ) { }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const url = new URL(createNewsDto.cover);
    const filename = url.pathname;
    const health = this.NewsRepository.create({
      ...createNewsDto,
      cover: filename,
    });

    return await this.NewsRepository.save(health);
  }


  async findOne(id: number, req: Request): Promise<News | null> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const news = await this.NewsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException('Promotion not found');
    }
    news.cover = `${baseUrl}${news.cover}`;
    return news;
  }

  async findAll(req: Request): Promise<News[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const news = await this.NewsRepository.find();
    return news.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async search(query: string, req: Request): Promise<News[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const news = await this.NewsRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
    });
    return news.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.NewsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException('Health record not found');
    }

    const url = new URL(updateNewsDto.cover);
    const filename = url.pathname;

    updateNewsDto.cover = filename;

    Object.assign(news, updateNewsDto);

    await this.NewsRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const result = await this.NewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Promotion not found');
    }
  }

}
