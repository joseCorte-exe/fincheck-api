import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    this.prismaService.user.create({
      data: createUserDto
    })
  }
}
