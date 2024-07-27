import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private userservice: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userservice.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                username: user.username,
                email: user.email
            }
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, username: user.username };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
