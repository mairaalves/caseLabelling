import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionDocument = Condition & Document;

@Schema()
export class Condition {
  @Prop({ required: true })
  conditionId: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);