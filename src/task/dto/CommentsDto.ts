import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString({ message: 'Comment text should be a string' })
  @IsNotEmpty({ message: 'Comment text should not be empty' })
  commentText: string;
}
