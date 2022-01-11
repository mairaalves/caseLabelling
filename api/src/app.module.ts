import { Module } from '@nestjs/common';
import { CaseModule } from './modules/case/case.module';
import { ConditionModule } from './modules/condition/condition.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = `mongodb://${process.env.DATA_BASE}:${process.env.MONGO_DB_PORT}/`;

@Module({
  imports: [CaseModule, ConditionModule, AuthModule, MongooseModule.forRoot(dbUrl)],
})
export class AppModule {}
