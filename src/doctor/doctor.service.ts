import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';


@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) { }

  async findAll(req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');

    const doctor = await this.doctorRepository.find({ relations: ['departments'] });

    return doctor.map(doctor => ({
      ...doctor,
      cover: `${baseUrl}${doctor.cover}`,
    }));;
  }


  async findOne(id: number, req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');

    const doctor = await  this.doctorRepository.findOne({ where: { id }, relations: ['departments'] });
    doctor.cover = `${baseUrl}${doctor.cover}`;
    return doctor
  }

}
