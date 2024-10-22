import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/';
import { Tokens } from './interfaces';
import { ATGuard, RTGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('local/signUp')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: LoginDto})
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка в bad request',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Не удалось создать пользователя, Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Ошибка при регистрации, Internal Server Error',
  })
  async signUpLocal(@Body() LoginDto: LoginDto): Promise<Tokens | HttpException> {
    console.log(LoginDto);
    try {
      return await this.authService.signUpLocal(LoginDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка при регистрации, Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('local/signIn')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Указан неверный пароль',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Ошибка при входе',
  })
  async signInLocal(@Body() loginDto: LoginDto): Promise<Tokens | HttpException> {
    return this.authService.signInLocal(loginDto);
  }

  @UseGuards(ATGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Выход из системы совершён успешно',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Ошибка при выходе из системы',
  })
  async logout(@GetCurrentUserId() id: number) {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RTGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Указан неверный Refresh Token',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Ошибка при получении токенов',
  })
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() id: number,
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }
 @Public()
  @Get('activate/:id')
  activateUser(@Param('id') id: number) {
    return this.userService.activateUser(id);
  }
}

 
