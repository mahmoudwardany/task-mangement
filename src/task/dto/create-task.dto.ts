import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../util/enum/task.enum';

export class CreateTaskDto {
  @IsString({ message: 'Title should be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString({ message: 'Description should be a string' })
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @IsString({ message: 'Status should be a string' })
  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsIn(Object.values(TaskStatus), {
    message: `Status must be one of the following values: ${Object.values(
      TaskStatus,
    ).join(', ')}`,
  })
  status: TaskStatus;
}
