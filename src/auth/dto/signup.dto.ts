import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class SignupDto extends LoginUserDto {
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;
}
