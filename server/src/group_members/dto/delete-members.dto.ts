import { IsNotEmpty, IsInt } from 'class-validator';

export class DeleteGroupMemberDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  groupId: number;
}
