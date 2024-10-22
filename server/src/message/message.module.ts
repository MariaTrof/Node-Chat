import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from './entities/message.entities';
import { Users } from 'src/users/entities/users.entity';
import { Groups } from 'src/group/entities/group.entities';

@Module({
  imports: [SequelizeModule.forFeature([Messages, Users, Groups])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessagesModule {}
