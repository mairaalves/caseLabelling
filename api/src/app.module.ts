import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = `mongodb://${process.env.DATA_BASE}:${process.env.MONGO_DB_PORT}/`;

@Module({
  imports: [MongooseModule.forRoot(dbUrl)],
})
export class AppModule {}
