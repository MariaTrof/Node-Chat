import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateConferenceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  groupId: number;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
