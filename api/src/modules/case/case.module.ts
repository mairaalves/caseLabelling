import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schemas/case.schema';

@Module({
    providers: [CaseService],
    controllers: [CaseController],
    imports: [MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }])]
})
export class CaseModule {}
