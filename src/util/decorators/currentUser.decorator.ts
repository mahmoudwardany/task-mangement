/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator((data, context:ExecutionContext) : UserEntity => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
