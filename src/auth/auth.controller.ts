import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response, Request as RequestType } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestType, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.login(req.user as User)
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    })
    return { msg: 'login success', accessToken: accessToken }
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', { expires: new Date() });
    return { msg: 'logout success' }
  }
}
