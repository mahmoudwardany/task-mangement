import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TaskEntity } from '../entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task.dto';
import { GetTaskDto } from '../dto/getTask.dto';
import { UpdateTaskTitleDescriptionDto } from '../dto/updateTitleDesc.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskModel: Model<TaskEntity>,
  ) {}
  //Creat Task
  async createTask(body: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const { title, description } = body;
    const newTask = new this.taskModel({ title, description, user });
    const savedTask = await newTask.save();
    user.tasks.push(savedTask._id);
    await user.save();
    return savedTask;
  }
  //Get All Task
  async getTasks(filter: GetTaskDto): Promise<TaskEntity[]> {
    try {
      const query = this.buildGetTasksQuery(filter);
      return query.exec();
    } catch (error) {
      throw error;
    }
  }

  async findTaskByID(id: ObjectId): Promise<TaskEntity> {
    const found = await this.taskModel.findOne({ _id: id });

    if (!found) {
      throw new NotFoundException(`Task Not Found with ID ${id}`);
    }

    return found;
  }
  //Delete Task
  async deleteTask(
    id: ObjectId,
    user: UserEntity,
  ): Promise<{ message: string }> {
    const taskId = id;

    const task = await this.findTaskByID(taskId);

    if (task?.user?.toString() !== user._id.toString()) {
      throw new UnauthorizedException(
        'You are not allowed to delete this task',
      );
    }
    await this.taskModel.deleteOne({ _id: taskId });
    return { message: 'Task Deleted' };
  }
  //Update Status
  async updateStatus(
    id: ObjectId,
    body: UpdateTaskStatusDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.findTaskByID(id);

    if (task?.user.toString() !== user?._id.toString()) {
      throw new UnauthorizedException(
        'You are not allowed to update this task',
      );
    }

    task.status = body.status;
    return task.save();
  }
  //Update Title And Description
  async updateTitleDescription(
    id: ObjectId,
    body: UpdateTaskTitleDescriptionDto,
    user: UserEntity,
  ) {
    const task = await this.findTaskByID(id);

    if (task?.user.toString() !== user?._id.toString()) {
      throw new UnauthorizedException(
        'You are not allowed to update this task',
      );
    }

    task.title = body.title;
    task.description = body.description;
    return task.save();
  }
  //Add Comment

  async addCommentToTask(
    taskId: ObjectId,
    commentText: string,
    user: UserEntity,
  ): Promise<TaskEntity | null> {
    try {
      const task = await this.taskModel.findById(taskId);

      if (!task) {
        return null;
      }

      task.comments.push({ userId: user.id, commentText });
      const updatedTask = await task.save();
      return updatedTask;
    } catch (error) {
      throw new Error(`Failed to add comment to the task: ${error}`);
    }
  }
  //Get All Comments For Task
  async getTaskComments(taskId: ObjectId) {
    try {
      const task = await this.taskModel.findById(taskId);

      if (!task) {
        return [];
      }

      return task.comments;
    } catch (error) {
      throw new Error(`Failed to get comments for the task: ${error}`);
    }
  }
  //helper
  private buildGetTasksQuery(filter: GetTaskDto) {
    const { status, page, limit } = filter;
    const query = this.taskModel.find();

    if (status) {
      query.where('status').equals(status);
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);
    }
    return query;
  }
}
