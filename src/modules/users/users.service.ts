import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto

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

    return user
  }
}
