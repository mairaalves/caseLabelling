import {
    Body,
    Controller,
    Get,
    Param,
    Put,
  } from '@nestjs/common';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseService } from './case.service';

@Controller('case')
export class CaseController {
    constructor(private readonly service: CaseService) {}

    @Get()
    async findAllToLabel() {
      return await this.service.findToLabel();
    }

    @Put(':caseId')
    async update(@Param('caseId') caseId: string, @Body() updateCaseDto: UpdateCaseDto) {
      return await this.service.editCase(caseId, updateCaseDto);
    }
}
