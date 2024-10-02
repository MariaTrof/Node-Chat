import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'USER NAME', nullable: false })
  readonly user_name: string;

  @ApiProperty({ description: 'PASSWORD', nullable: false })
  readonly user_password: string;

  @ApiProperty({ description: 'PROFILE PICTURE', nullable: true })
  readonly profile_picture: string;

  @ApiProperty({ description: 'IS ADMIN', default: false, nullable: false })
  readonly is_admin: boolean = false;
}
