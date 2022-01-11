import { Module } from '@nestjs/common';
import { ConditionModule } from './modules/condition/condition.module'
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = `mongodb://${process.env.DATA_BASE}:${process.env.MONGO_DB_PORT}/`;

@Module({
  imports: [ConditionModule, MongooseModule.forRoot(dbUrl)],
})
export class AppModule {}
