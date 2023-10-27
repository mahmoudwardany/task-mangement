import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.signIn(body);
  }
}
