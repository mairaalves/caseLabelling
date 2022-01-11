import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConditionModule } from './modules/condition/condition.module';
import { CaseModule } from './modules/case/case.module';

const dbUrl = `mongodb://${process.env.DATA_BASE}:${process.env.MONGO_DB_PORT}/`;

@Module({
  imports: [CaseModule, ConditionModule, MongooseModule.forRoot(dbUrl)],
})
export class AppModule {}
