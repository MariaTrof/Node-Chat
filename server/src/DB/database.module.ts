import { Module } from '@nestjs/common';
import { databaseProviders } from './databaseProviders';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
