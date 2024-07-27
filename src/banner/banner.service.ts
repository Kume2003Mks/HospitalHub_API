import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';

@Injectable()
export class BannerService {

  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) { }

  async create(createBannerDto: CreateBannerDto) {
    const regex = /[^/]+$/;
    const matches = createBannerDto.image.match(regex);
    const filename = matches ? matches[0] : "";

    const health = this.bannerRepository.create({
      ...createBannerDto,
      image: filename,
    });

    return await this.bannerRepository.save(health);
    }
    
    async findAll() {
    const banner = await this.bannerRepository.find()
    return banner;
  }

  async findOne(id: number) {
    const promotion = await this.bannerRepository.findOne({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    return promotion;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const bannerUpdate = await this.bannerRepository.findOne({ where: { id }});
    if (!bannerUpdate) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }

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
