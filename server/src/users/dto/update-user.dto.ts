import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'PASSWORD', nullable: false })
  readonly user_password?: string;

  @ApiProperty({ description: 'PROFILE PICTURE', nullable: true })
  readonly profile_picture?: string;
}
