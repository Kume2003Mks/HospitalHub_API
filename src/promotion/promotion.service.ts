import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from '../entities/promotion.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class PromotionService {

  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) { }

  async findAll(page: number = 1, size: number = 21, req: Request): Promise<Promotion[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const promotions = await this.promotionRepository.find({
      select: [
        'id', 'title', 'description', 'cover', 'price', 'max_price',
        'create_at', 'end_date', 'views'
      ],
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return promotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async search(query: string, req: Request): Promise<Promotion[]> {
    const baseUrl = req.protocol + '://' + req.get('host');

    const promotions = await this.promotionRepository
      .createQueryBuilder('promotion')
      .select([
        'promotion.id', 'promotion.title', 'promotion.description', 'promotion.cover',
        'promotion.price', 'promotion.max_price', 'promotion.create_at',
        'promotion.end_date', 'promotion.views'
      ])
      .where('promotion.publish = :publish', { publish: true })
      .andWhere('(promotion.title LIKE :query OR promotion.description LIKE :query)', { query: `%${query}%` })
      .getMany();

    return promotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async findOne(id: number, req: Request): Promise<Promotion | null> {
    const promotion = await this.promotionRepository.findOne({
      where: { id, publish: true },
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    const baseUrl = req.protocol + '://' + req.get('host');
    promotion.cover = `${baseUrl}${promotion.cover}`;
    return promotion;
  }

  async incrementViews(promotionId: number): Promise<void> {
    await this.promotionRepository.increment({ id: promotionId }, 'views', 1);
  }

  // ค้นหานายการล่าสุด
  async findNewest(page: number = 1, size: number = 21, isNew: boolean, req: Request): Promise<Promotion[]> {
    const baseUrl = req.protocol + '://' + req.get('host');

    const newestPromotions = await this.promotionRepository.find({
      order: {
        create_at: isNew ? 'DESC' : 'ASC',
      },
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return newestPromotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async findByImportance(page: number = 1, size: number = 3, req: Request): Promise<Promotion[]> {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const importantPromotions = await this.promotionRepository.find({
      order: {
        important: 'DESC',
      },
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return importantPromotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));
  }
}
