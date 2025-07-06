import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { AuthenticateDto } from './dtos/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const user = await this.userRepository.findUnique({
      where: {
        email: authenticateDto.email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = compare(authenticateDto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id
    })

    return {
      accessToken
    }
  }
}
