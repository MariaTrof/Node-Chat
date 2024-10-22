import { Controller, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create_group.dto';
import { ApiTags } from '@nestjs/swagger';
import { ATGuard } from 'src/auth/guards';
import { Groups } from './entities/group.entities';

@ApiTags('Groups')
@UseGuards(ATGuard)
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('groups')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Delete(':id') // Удаляем группу по ID
  async removeGroup(@Param('id') id: string) {
    await this.groupService.deleteGroup(Number(id));
    return { message: 'Group deleted successfully' };
  }
}
