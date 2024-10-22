import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups } from './entities/group.entities';
import { Users } from 'src/users/entities/users.entity';
import { GroupMembers } from '../group_members/entities/group_members.entity';

@Module({
  imports: [SequelizeModule.forFeature([Groups, Users, GroupMembers])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupsModule {}
