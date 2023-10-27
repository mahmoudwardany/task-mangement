/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { TaskStatus } from '../../util/enum/task.enum';

export class GetTaskDto {
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
    @IsInt({ message: 'Page should be an integer' })
  @IsPositive({ message: 'Page should be a positive integer' })
  page:number
  
  @IsOptional()
    @IsInt({ message: 'Limit should be an integer' })
  @IsPositive({ message: 'Limit should be a positive integer' })
  limit:number
}
