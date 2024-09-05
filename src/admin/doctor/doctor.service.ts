import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Department } from 'src/entities/department.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Request } from 'express';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    const { name, cover, specialized, content, publish, departmentId } = createDoctorDto;

    const departments = await this.departmentRepository.findBy({
      department_id: In(departmentId),
    });

    if (departments.length !== departmentId.length) {
      throw new Error('Some departments not found');
    }

    const url = new URL(cover);
    const filename = url.pathname;

    const doctor = this.doctorRepository.create({
      name,
      cover :filename,
      specialized,
      content,
      publish,
      departments,
    });

    return this.doctorRepository.save(doctor);
  }

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

    const doctor = await this.doctorRepository.findOne({ where: { id }, relations: ['departments'] });
    doctor.cover = `${baseUrl}${doctor.cover}`;
    return doctor
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const { name, cover, specialized, content, publish, departmentId } = updateDoctorDto;

    const doctor = await this.doctorRepository.findOne({ where: { id }, relations: ['departments'] });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const departments = await this.departmentRepository.findBy({
      department_id: In(departmentId),
    });

    if (departments.length !== departmentId.length) {
      throw new Error('Some departments not found');
    }

    const url = new URL(cover);
    const filename = url.pathname;

    doctor.name = name;
    doctor.cover = filename;
    doctor.specialized = specialized;
    doctor.content = content;
    doctor.publish = publish;
    doctor.departments = departments;

    return this.doctorRepository.save(doctor);
  }

  remove(id: number) {
    return this.doctorRepository.delete(id);
  }
}
