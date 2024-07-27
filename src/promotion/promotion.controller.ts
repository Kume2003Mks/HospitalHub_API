import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Request } from 'express';


@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) { }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') pageSize: number = 21,
    @Query('search') search: string,
    @Query('new') isNew: string,
    @Query('important') isImportant: string,
    @Req() req: Request
  ) {
    const isNewPromotions = isNew === 'true'; // Check if isNew is 'true' string
    const isImportantPromotions = isImportant === 'true'; // Check if isImportant is 'true' string

    if (isNewPromotions) {
      return this.promotionService.findNewest(page, pageSize, isNewPromotions, req);
    }
    if (isImportantPromotions) {
      return this.promotionService.findByImportance(page, pageSize, req);
    }
    if (search) {
      return this.promotionService.search(search, req);
    } else {
      return this.promotionService.findAll(page, pageSize, req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request, @Query('preview') preview: string = 'false') {

    const sessionKey = `viewedPromotion-${id}`;
    const isPreview = preview === 'false';

    // ตรวจสอบว่ามีการเข้าชมในเซสชั่นหรือไม่
    if (!req.session[sessionKey] && isPreview) {
      this.promotionService.incrementViews(+id);
      req.session[sessionKey] = true;
    }

    return this.promotionService.findOne(+id, req);
  }


}
