import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from '../../entities/promotion.entity';
import { Like, Repository } from 'typeorm';
import { Request } from 'express';
import { CreatePromotionDto } from './dto/createPromotion';
import { UpdatePromotionDto } from './dto/updatePromotion';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) { }

  async findAll(req: Request): Promise<Promotion[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const promotions = await this.promotionRepository.find();
    return promotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async search(query: string, req: Request): Promise<Promotion[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const promotions = await this.promotionRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
    });
    return promotions.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));;
  }

  async findOne(id: number, req: Request): Promise<Promotion | null> {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    const baseUrl = req.protocol + '://' + req.get('host');
    promotion.cover = `${baseUrl}${promotion.cover}`;
    return promotion;
  }

  async create(createPromotion: CreatePromotionDto): Promise<Promotion> {
    const url = new URL(createPromotion.cover);
    const filename = url.pathname;

    const promotion = this.promotionRepository.create({
      ...createPromotion,
      cover: filename,
    });
    return await this.promotionRepository.save(promotion);
  }


  async update(id: number, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotionToUpdate = await this.promotionRepository.findOne({ where: { id } });
    if (!promotionToUpdate) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }

    const url = new URL(updatePromotionDto.cover);
    const filename = url.pathname;

    updatePromotionDto.cover = filename

    // Merge fields from update DTO into the retrieved promotion
    Object.assign(promotionToUpdate, updatePromotionDto);

    return await this.promotionRepository.save(promotionToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Promotion not found');
    }
  }

}
