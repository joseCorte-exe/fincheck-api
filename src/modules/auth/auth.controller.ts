import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/is-public';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() authenticateDto: SigninDto) {
    return this.authService.signin(authenticateDto);
  }

  @Post('signup')
  create(@Body() createUserDto: SignupDto) {
    return this.authService.signup(createUserDto);
  }
}
