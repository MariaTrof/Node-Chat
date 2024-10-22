import { Injectable } from '@nestjs/common';
import { GroupMembers } from './entities/group_members.entity';
import { CreateGroupMemberDto } from './dto/create-members';
import { DeleteGroupMemberDto } from './dto/delete-members.dto';

@Injectable()
export class GroupMembersService {
  async addUserToGroup(dto: CreateGroupMemberDto): Promise<GroupMembers> {
    return GroupMembers.create(dto);
  }

  async removeUserFromGroup(dto: DeleteGroupMemberDto): Promise<void> {
    const member = await GroupMembers.findOne({
      where: { userId: dto.userId, groupId: dto.groupId },
    });

    if (member) {
      await member.destroy();
    }
  }

  async getGroupMembers(groupId: number): Promise<GroupMembers[]> {
    return GroupMembers.findAll({
      where: { groupId },
    });
  }
}
