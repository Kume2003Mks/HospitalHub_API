import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) { }

  async findAll() {
    return await this.doctorRepository.find({ relations: ['departments'] });
  }


  async findOne(id: number) {
    return await this.doctorRepository.findOne({ where: { id }, relations: ['departments'] });
  }

}
