import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condition, ConditionDocument } from './schemas/condition.schemas';

@Injectable()
export class ConditionService {
  constructor(
    @InjectModel(Condition.name)
    private readonly model: Model<ConditionDocument>,
  ) {}

  async findAll(): Promise<Condition[]> {
    return await this.model.find().exec();
  }
}
