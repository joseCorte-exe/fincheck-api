import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class UsersService {
  constructor (
    private readonly usersRepository: UserRepository
  ) {}

  getUserById(userId: string) {
    return this.usersRepository.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        email: true
      }
    })
  }
}
