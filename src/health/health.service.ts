import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Health } from 'src/entities/health.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';


@Injectable()
export class HealthService {

  constructor(
    @InjectRepository(Health)
    private readonly healthRepository: Repository<Health>,
  ) { }

  async findAll(page: number = 1, size: number = 21, req: Request): Promise<Health[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const health = await this.healthRepository.find({
      select: [
        'id', 'title', 'description', 'cover',
        'create_at', 'views', 'publish'
      ],
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return health.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }))
  }

  async search(query: string, req: Request): Promise<Health[]> {
    const baseUrl = req.protocol + '://' + req.get('host');
    const health = await this.healthRepository
      .createQueryBuilder('health')
      .select([
        'health.id', 'health.title', 'health.description', 'health.cover',
        'health.create_at', 'health.publish'
      ])
      .where('health.publish = :publish', { publish: true })
      .andWhere('(health.title LIKE :query OR health.description LIKE :query)', { query: `%${query}%` })
      .getMany();
    return health.map(health => ({
      ...health,
      cover: `${baseUrl}${health.cover}`,
    }))
  }

  async findOne(id: number, req: Request) {
    const health = await this.healthRepository.findOne({ where: { id } });
    if (!health) {
      throw new NotFoundException('Promotion not found');
    }
    const baseUrl = req.protocol + '://' + req.get('host');
    health.cover = `${baseUrl}${health.cover}`;
    return health;
  }


  async incrementViews(Id: number): Promise<void> {
    await this.healthRepository.increment({ id: Id }, 'views', 1);
  }

  async findByImportance(page: number = 1, size: number = 4, req: Request): Promise<Health[]> {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const importantHealth = await this.healthRepository.find({
      order: {
        important: 'DESC',
      },
      where: { publish: true },
      skip: (page - 1) * size,
      take: size,
    });
    return importantHealth.map(promotion => ({
      ...promotion,
      cover: `${baseUrl}${promotion.cover}`,
    }));
  }

}
