import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty()
  content: string;
}
