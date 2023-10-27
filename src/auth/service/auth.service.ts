import { ConflictException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../util/jwt/jwt-payload';
import { SignupDto } from '../dto/signup.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { UserEntity } from '../../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly configService: ConfigService,
  ) {}
  async signup(body: SignupDto) {
    const user = await this.findUserByEmail(body.email);
    if (user) throw new ConflictException('Email Already exists');
    body.password = await this.hashPassword(body.password);
    const newUser = new this.userModel(body);
    const saveUser = await newUser.save();
    return saveUser;
  }

  async signIn(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.findUserByEmail(email);
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new ConflictException('Invalid email or password');
    }
    delete user.password;
    const payload: JwtPayload = {
      username: user.username,
      email: user.email,
      id: user._id,
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    const accessToken = sign(payload, secret, { expiresIn: '1h' });
    return { token: accessToken };
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password -tasks').exec();
  }

  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async comparePassword(password: string, userPassword: string) {
    return await compare(password, userPassword);
  }
}
