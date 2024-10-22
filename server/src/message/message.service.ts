import { Injectable } from '@nestjs/common';
import { Messages } from './entities/message.entities';
import { Users } from 'src/users/entities/users.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';


@Injectable()
export class MessageService {
  async sendMessage(createMessageDto: CreateMessageDto): Promise<Messages> {
    const message = await Messages.create(createMessageDto);
    return message;
  }

  async getMessages(groupId: number): Promise<Messages[]> {
    return Messages.findAll({
      where: { groupId },
      include: [{ model: Users, as: 'sender' }],
      order: [['createdAt', 'ASC']],
    });
  }

  async updateMessage(updateMessageDto: UpdateMessageDto): Promise<Messages> {
    const message = await Messages.findOne({
      where: { id: updateMessageDto.id },
    });
    if (!message) {
      throw new Error(`Message with id ${updateMessageDto.id} not found.`);
    }
    message.content = updateMessageDto.content;
    await message.save();
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    const message = await Messages.findOne({ where: { id } });
    if (!message) {
      throw new Error(`Message with id ${id} not found.`);
    }
    await message.destroy();
  }
}
