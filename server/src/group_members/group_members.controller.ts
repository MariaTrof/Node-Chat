import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { CreateGroupMemberDto } from './dto/create-members';
import { DeleteGroupMemberDto } from './dto/delete-members.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Group_Members')
@Controller('group_members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post('group/members')
  async addUserToGroup(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.addUserToGroup(createGroupMemberDto);
  }

  @Delete('group/members/delete')
  async removeUserFromGroup(
    @Body() deleteGroupMemberDto: DeleteGroupMemberDto,
  ) {
    return this.groupMembersService.removeUserFromGroup(deleteGroupMemberDto);
  }

  @Get('group/:groupId')
  async getGroupMembers(@Param('groupId') groupId: number) {
    return this.groupMembersService.getGroupMembers(groupId);
  }
}
