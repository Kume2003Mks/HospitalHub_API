import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News)
    private readonly NewsRepository: Repository<News>,
  ) { }

  async findAll(page: number = 1, size: number = 21, req: Request): Promise<News[]> {
    const baseUrl = req.protocol + '://' + req.get('host');

    const news = await this.NewsRepository.find({
      select: [
        'id', 'title', 'description', 'cover',
        'create_at'
      ],
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return news.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));
  }

  async search(query: string, req: Request): Promise<News[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const news = await this.NewsRepository
      .createQueryBuilder('news')
      .select([
        'news.id', 'news.title', 'news.description', 'news.cover',
        'news.create_at', 'news.publish'
      ])
      .where('news.publish = :publish', { publish: true })
      .andWhere('(news.title LIKE :query OR news.description LIKE :query)', { query: `%${query}%` })
      .getMany();
    return news.map(news => ({
      ...news,
      cover: `${baseUrl}${news.cover}`,
    }))
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

  async incrementViews(Id: number): Promise<void> {
    await this.NewsRepository.increment({ id: Id }, 'views', 1);
  }

}
