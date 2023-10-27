import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task.dto';
import { GetTaskDto } from '../dto/getTask.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/util/decorators/currentUser.decorator';
import { AuthenticationGuard } from 'src/util/guard/auth.guard';
import { TaskStatutsValid } from 'src/util/pipe/task-status.pipe';
import { ObjectId, Types } from 'mongoose';
import { UpdateTaskTitleDescriptionDto } from '../dto/updateTitleDesc.dto';
import { CommentDto } from '../dto/CommentsDto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  async findTasks(@Query() filterDto: GetTaskDto) {
    return await this.taskService.getTasks(filterDto);
  }

  @Get(':id')
  async findOneTask(@Param('id') id: string): Promise<TaskEntity> {
    const taskId = new Types.ObjectId(id);
    return await this.taskService.findTaskByID(taskId as unknown as ObjectId);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(body, user);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    const taskId = new Types.ObjectId(id);
    return await this.taskService.deleteTask(
      taskId as unknown as ObjectId,
      user,
    );
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  async updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatutsValid) status: UpdateTaskStatusDto,
    @CurrentUser() user: UserEntity,
  ) {
    const taskId = new Types.ObjectId(id);

    return await this.taskService.updateStatus(
      taskId as unknown as ObjectId,
      status,
      user,
    );
  }
  @Patch(':id')
  async updateTaskDetails(
    @Param('id') id: string,
    @Body() body: UpdateTaskTitleDescriptionDto,
    @CurrentUser() user: UserEntity,
  ) {
    const taskId = new Types.ObjectId(id);
    return await this.taskService.updateTitleDescription(
      taskId as unknown as ObjectId,
      body,
      user,
    );
  }
  @Post(':taskId/comments')
  async addComment(
    @Param('taskId') id: string,
    @Body() commentDto: CommentDto,
    @CurrentUser() user: UserEntity,
  ) {
    const taskId = new Types.ObjectId(id);
    try {
      return await this.taskService.addCommentToTask(
        taskId as unknown as ObjectId,
        commentDto.commentText,
        user,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //Get Comments
  @Get(':taskId/comments')
  async getTaskComments(@Param('taskId') id: string) {
    const taskId = new Types.ObjectId(id);
    const comments = await this.taskService.getTaskComments(
      taskId as unknown as ObjectId,
    );
    return comments;
  }
}
