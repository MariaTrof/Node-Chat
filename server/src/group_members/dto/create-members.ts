import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateGroupMemberDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  groupId: number;
}
