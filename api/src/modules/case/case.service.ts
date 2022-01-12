import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case, CaseDocument } from './schemas/case.schema';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Case.name) private readonly model: Model<CaseDocument>,
  ) {}

  async findToLabel(): Promise<Case> {
    return (
      (await this.model.findOne({ label: { $exists: false } }).exec()) ||
      new Case()
    );
  }

  async editCase(caseId: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    return await this.model.findByIdAndUpdate(caseId, updateCaseDto, {
      new: true,
    });
  }
}
