import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(create: CreateAdminDto) {
    const user = new User;
    user.username = create.username;
    user.email = create.email;
    user.password = create.password

    return this.userRepository.save(user);
  }

  async findByEmail(email: string):Promise<User> {
    const promotion = await this.userRepository.findOne({ where: { email } });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }
    return promotion;
  }
}
