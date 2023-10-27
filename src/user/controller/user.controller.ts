import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthenticationGuard } from 'src/util/guard/auth.guard';

@Controller('user')
@UseGuards(AuthenticationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.findAllUsers(page, limit);
  }
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }
}
