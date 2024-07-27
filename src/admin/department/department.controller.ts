import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';


@Controller('admin/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

}
