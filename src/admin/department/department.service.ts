import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly departRepository: Repository<Department>,
  ) { }

  async findAll(): Promise<Department[]> {
    const dp = this.departRepository.find()
    return dp;
  }

  async findOne(department_id: number) {
    const dp = await this.departRepository.findOne({ where: { department_id } });
    if (!dp) {
      throw new NotFoundException('Promotion not found');
    }
    return dp;
  }

}
