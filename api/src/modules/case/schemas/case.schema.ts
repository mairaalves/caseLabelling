import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop({ required: true })
  caseId: string;

  @Prop()
  doctorId: string;

  @Prop()
  label: string;

  @Prop()
  timeToLabel: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
