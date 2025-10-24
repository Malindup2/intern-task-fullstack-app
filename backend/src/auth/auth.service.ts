import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterUserDto) {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) throw new UnauthorizedException('Email already in use');
    const user = await this.usersService.create(userData);
    return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, email: user.email };
    // Use JWT module's configured expiration (24h) instead of overriding
    return { access_token: this.jwtService.sign(payload) };
  }
}
