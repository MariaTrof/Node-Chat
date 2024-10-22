import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateMessageDto {
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  readonly content: string;
}
