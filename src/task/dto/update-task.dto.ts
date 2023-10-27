import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../../util/enum/task.enum';

export class UpdateTaskStatusDto {
  @IsString({ message: 'Status should be a string' })
  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsIn(Object.values(TaskStatus), {
    message: `Status must be one of the following values: ${Object.values(
      TaskStatus,
    ).join(', ')}`,
  })
  status: TaskStatus;
}
