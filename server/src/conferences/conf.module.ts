import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conferences } from './entities/conf.entities';
import { ConferenceController } from './conf.controller';
import { ConferenceService } from './conf.service';


@Module({
  imports: [SequelizeModule.forFeature([Conferences])],
  controllers: [ConferenceController],
  providers: [ConferenceService],
})
export class ConferenceModule {}
