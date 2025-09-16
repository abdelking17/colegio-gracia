import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email ya registrado');

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password, role: dto.role },
    });
    const { password: _, ...safe } = user;
    return safe;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map(({ password, ...u }) => u);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password, ...safe } = user;
    return safe;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } }); // incluye password
  }

  async update(id: string, dto: UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.update({ where: { id }, data: dto });
    const { password, ...safe } = user;
    return safe;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true };
  }
}
