import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Health } from 'src/entities/health.entity';
import { Like, Repository } from 'typeorm';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { Request } from 'express';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private readonly healthRepository: Repository<Health>,
  ) { }

  async findAll(req: Request): Promise<Health[]> {
    const baseUrl = req.protocol + '://' + req.get('host');

    const health = await this.healthRepository.find();
    return health.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));
  }

  async search(query: string, req: Request): Promise<Health[]> {
    const baseUrl = req.protocol + '://' + req.get('host');

    const health = await this.healthRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
    });
    return health.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }))
  }

  async findOne(id: number, req: Request) {
    const health = await this.healthRepository.findOne({ where: { id } });
    if (!health) {
      throw new NotFoundException('Health not found');
    }
    const baseUrl = req.protocol + '://' + req.get('host');
    health.cover = `${baseUrl}${health.cover}`;
    return health;
  }

  async create(createHealthDto: CreateHealthDto): Promise<Health> {
    const url = new URL(createHealthDto.cover);
    const filename = url.pathname;

    const health = this.healthRepository.create({
      ...createHealthDto,
      cover: filename,
    });

    return await this.healthRepository.save(health);
  }

  async update(id: number, updateHealthDto: UpdateHealthDto) {
    const health = await this.healthRepository.findOne({ where: { id } });
    if (!health) {
      throw new NotFoundException('Health record not found');
    }
    const url = new URL(updateHealthDto.cover);
    const filename = url.pathname;
    updateHealthDto.cover = filename;
    // Update fields
    Object.assign(health, updateHealthDto);

    await this.healthRepository.save(health);
  }

  async remove(id: number): Promise<void> {
    const result = await this.healthRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Promotion not found');
    }
  }
}
