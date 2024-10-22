import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Введите имя юзера' })
  @ApiProperty({ description: 'Имя пользователя', example: 'User-Test' })
  readonly user_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Введите пароль' })
  @ApiProperty({ description: 'Пароль пользователя', example: 'test12' })
  readonly user_password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Фото профиля', example: 'test12.png' })
  readonly profile_picture: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Админ статус', example: 'false' })
  readonly is_admin: boolean;
}
