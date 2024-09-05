import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';
import { Request } from 'express';

@Injectable()
export class BannerService {

  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) { }

  async create(createBannerDto: CreateBannerDto) {
    const url = new URL(createBannerDto.image);
    const filename = url.pathname;

    const health = this.bannerRepository.create({
      ...createBannerDto,
      image: filename,
    });

    return await this.bannerRepository.save(health);
  }

  async findAll(req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');

    const banner = await this.bannerRepository.find()
    return banner.map(banner => ({
      ...banner,
      image: `${baseUrl}${banner.image}`,
    }));;
  }

  async findOne(id: number, req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');

    const banner = await this.bannerRepository.findOne({
      where: { id },
    });
    if (!banner) {
      throw new NotFoundException(`banner with id ${id} not found`);
    }

    banner.image = `${baseUrl}${banner.image}`

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const bannerUpdate = await this.bannerRepository.findOne({ where: { id } });
    if (!bannerUpdate) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }

    const url = new URL(updateBannerDto.image);
    const filename = url.pathname;

    updateBannerDto.image = filename;

    // Merge fields from update DTO into the retrieved promotion
    Object.assign(bannerUpdate, updateBannerDto);

    return await this.bannerRepository.save(bannerUpdate);
  }

  async remove(id: number) {
    const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Promotion not found');
    }
  }
}
