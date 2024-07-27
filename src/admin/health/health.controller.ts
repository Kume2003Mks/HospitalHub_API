import { Controller, Get, Param, UseGuards, Query, Post, Body, Patch, Req, Delete } from '@nestjs/common';
import { HealthService } from './health.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) { }
  @Get()
  findAll(
    @Query('search') search: string,
    @Req() req: Request
  ) {
    if (search) {
      return this.healthService.search(search, req);
    } else {
      return this.healthService.findAll(req);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.healthService.findOne(+id, req);
  }

  @Post()
  create(
    @Body() createHealth: CreateHealthDto,
  ) {
    return this.healthService.create(createHealth);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHealthDto: UpdateHealthDto,
  ) {
    await this.healthService.update(+id, updateHealthDto);
    return { message: 'Health record updated successfully' };
  }

  @Delete(':id')
  delete(@Param('id') id: string,) {
    return this.healthService.remove(+id)
  }
}
