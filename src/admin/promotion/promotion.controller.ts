import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Request } from 'express';

import { CreatePromotionDto } from './dto/createPromotion';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePromotionDto } from './dto/updatePromotion';

@UseGuards(JwtAuthGuard)
@Controller('admin/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) { }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Req() req: Request
  ) {
    if (search) {
      return this.promotionService.search(search, req);
    } else {
      return this.promotionService.findAll(req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.promotionService.findOne(+id, req);
  }

  @Post()
  async create(
    @Body() createPromotion: CreatePromotionDto,
  ) {
    return this.promotionService.create(createPromotion);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthDto: UpdatePromotionDto,
  ) {
    
      this.promotionService.update(+id, updateHealthDto);

    return { message: 'Health record updated successfully' };
  }

  @Delete(':id')
  delete(@Param('id') id: string,){
    return this.promotionService.remove(+id)
  }
}
