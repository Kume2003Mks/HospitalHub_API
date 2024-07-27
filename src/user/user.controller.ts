import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

 // @UseGuards(JwtAuthGuard)
  @Post('/registor')
  getRegistor(@Body() create: CreateAdminDto) {
    return this.userService.create(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: { user: User }) {
    const result = await this.userService.findByEmail(req.user.email)
    return result

  }
}
