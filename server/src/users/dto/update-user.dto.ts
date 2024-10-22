import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'PASSWORD', nullable: false })
  user_password?: string;

  @ApiProperty({ description: 'PROFILE PICTURE', nullable: true })
  profile_picture?: string;
}
