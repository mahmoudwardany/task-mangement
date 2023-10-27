import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class TaskEntity extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'TODO' })
  status: string;
  @Prop({
    type: [{ userId: MongooseSchema.Types.ObjectId, commentText: String }],
    default: [],
  })
  comments: { userId: MongooseSchema.Types.ObjectId; commentText: string }[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserEntity' })
  user: MongooseSchema.Types.ObjectId;
}

export const TaskEntitySchema = SchemaFactory.createForClass(TaskEntity);
