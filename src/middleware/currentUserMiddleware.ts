import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from '../user/service/user.service';

declare module 'express' {
  interface Request {
    user?: UserEntity;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const secretKey = this.configService.get<string>('JWT_SECRET');
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).json({ message: 'No token' });
    }

    try {
      const token = authHeaders.split(' ')[1];
      const { id } = <JwtInterface>verify(token, secretKey);
      const currentUser = await this.userService.findUserById(id);
      if (!currentUser) {
        throw new UnauthorizedException('Invalid Token, Please Login first');
      }
      req.user = currentUser;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  }
}

interface JwtInterface {
  id: string;
}
