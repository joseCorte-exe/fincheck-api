import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signin(authenticateDto: SigninDto) {
    const user = await this.usersRepository.findUnique({
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

    const accessToken = await this.generateAccessToken(user.id)

    return {
      accessToken
    }
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto

    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    })

    if (emailTaken) {
      throw new ConflictException('Email already taken')
    }

    const hashedPassword = await hash(password, 12)

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelancer', icon: 'freelancer', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expenses
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'INCOME' },
              { name: 'Educação', icon: 'education', type: 'INCOME' },
              { name: 'Lazer', icon: 'fun', type: 'INCOME' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ]
          }
        }
      }
    })

    const accessToken = await this.generateAccessToken(user.id)

    return {
      accessToken
    }
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({
      sub: userId
    })
  }
}
