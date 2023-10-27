import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskTitleDescriptionDto {
  @IsString({ message: 'Title should be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString({ message: 'Description should be a string' })
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;
}
