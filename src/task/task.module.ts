import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, TaskEntitySchema } from './entities/task.entity'; // Import the Mongoose entity and schema
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskEntity.name, schema: TaskEntitySchema },
    ]),
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
