import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { ATGuard } from 'src/auth/guards';
import { GetCurrentUserId } from 'src/auth/decorators';
import { UpdateMessageDto } from './dto/update-message.dto';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(ATGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('message')
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetCurrentUserId() userId: number,
  ) {
    createMessageDto.senderId = userId;
    return this.messageService.sendMessage(createMessageDto);
  }

  @Get(':groupId')
  async getMessages(@Param('groupId') groupId: number) {
    return this.messageService.getMessages(groupId);
  }

  @Put('message') // Метод изменений
  async updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.updateMessage(updateMessageDto);
  }

  @Delete('message/:id') // Метод удаления
  async deleteMessage(@Param('id') id: number) {
    return this.messageService.deleteMessage(id);
  }
}
