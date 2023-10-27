import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class UserEntity extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop({
    select: false,
  })
  password: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TaskEntity' }] })
  tasks: MongooseSchema.Types.ObjectId[];
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
