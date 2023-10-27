import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async findAllUsers(
    page: number = 1,
    limit: number = 10,
  ): Promise<UserEntity[]> {
    const skip = (page - 1) * limit;
    return this.userModel.find().skip(skip).limit(limit).exec();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return await this.userModel.findById(id).populate('tasks').exec();
  }
}
