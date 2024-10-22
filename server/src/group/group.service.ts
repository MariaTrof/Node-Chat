import { Injectable } from '@nestjs/common';
import { Groups } from './entities/group.entities';
import { CreateGroupDto } from './dto/create_group.dto';

@Injectable()
export class GroupService {
  async createGroup(createGroupDto: CreateGroupDto): Promise<Groups> {
    return Groups.create(createGroupDto);
  }

  async addUserToGroup(groupId: number, userId: number): Promise<void> {
    const group = await Groups.findByPk(groupId);
    if (group) {
      await group.$add('members', userId); // Этот метод автоматически добавит запись в таблицу group_members
    }
  }

  async deleteGroup(groupId: number): Promise<void> {
    const group = await Groups.findByPk(groupId);
    if (group) {
      await group.destroy(); // Удаляем группу
    } else {
      throw new Error('Group not found');
    }
  }
}
