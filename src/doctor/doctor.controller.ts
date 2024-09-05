import { Controller, Get, Param, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Request } from 'express';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get()
  findAll(@Req() req: Request) {
    return this.doctorService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.doctorService.findOne(+id, req);
  }

}
