import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupMembers } from './entities/group_members.entity';
import { Users } from 'src/users/entities/users.entity';
import { Groups } from 'src/group/entities/group.entities';


@Module({
  imports: [SequelizeModule.forFeature([GroupMembers, Users, Groups])],
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
})
export class GroupMembersModule {}
