import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    // UsersService ya valida email duplicado y hashea
    const user = await this.users.create(dto);
    const token = await this.sign(user);
    return { user, access_token: token };
  }

  async login(dto: LoginDto) {
    const found = await this.users.findByEmail(dto.email);
    if (!found) throw new UnauthorizedException('Credenciales inválidas');
    const ok = await bcrypt.compare(dto.password, found.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const { password, ...user } = found;
    const token = await this.sign(user);
    return { user, access_token: token };
  }

  private async sign(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES || '7d',
    });
  }
}
