import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }
}
