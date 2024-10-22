import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { LogoutResponse, Tokens } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private userService: UsersService,
    private JWTService: JwtService,
  ) {}

  async signUpLocal(LoginDto: LoginDto): Promise<Tokens | HttpException> {
    try {
      const candidate = await this.userService.getByName(LoginDto.user_name); // Проверяем по имени пользователя
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким именем уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await this.hashData(LoginDto.user_password);
      const newUser = await this.userService.create({
        ...LoginDto,
        user_password: hashedPassword,
      });

      const tokens = await this.getTokens(newUser.id, newUser.user_name);
      await this.updateRTHash(newUser.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw new HttpException(
        'Ошибка при регистрации',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async signInLocal(loginDto: LoginDto): Promise<Tokens | HttpException> {
    try {
      const user = await this.userService.getByName(loginDto.user_name);
      console.log(user);

      if (!user) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }

      const passwordMatches = await bcrypt.compare(
        loginDto.user_password,
        user.user_password,
      );
      console.log(passwordMatches);

      if (!passwordMatches) {
        return new HttpException(
          'Указан неверный пароль',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokens = await this.getTokens(user.id, user.user_name);
      console.log(tokens);

      await this.updateRTHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return new HttpException(
        'Ошибка при входе',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async logout(id: number): Promise<LogoutResponse | HttpException> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }
      await user.update({ hashedRT: null });
      return { message: 'Выход из системы совершён успешно' };
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
      return new HttpException(
        'Ошибка при выходе из системы',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async hashData(data: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(data, salt);
    } catch (error) {
      console.error('Ошибка при хешировании:', error);
      throw new HttpException(
        'Ошибка при хешировании пароля',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshTokens(id: number, rt: string): Promise<Tokens | HttpException> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user || !user.hashedRT) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }

      const rtMatches = await bcrypt.compare(rt, user.hashedRT);
      if (!rtMatches) {
        return new HttpException(
          'Указан неверный Refresh Token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokens = await this.getTokens(user.id, user.user_name);
      await this.updateRTHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      return new HttpException(
        'Ошибка при получении токенов',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async updateRTHash(id: number, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    const user = await this.userRepository.findByPk(id);
    await user.update({ hashedRT: hash });
  }

  async getTokens(id: number, user_name: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.JWTService.signAsync(
        {
          sub: id,
          user_name, // Возвращаем имя пользователя
        },
        {
          expiresIn: '15m',
          secret: process.env.JWT_ACCESS_KEY,
        },
      ),
      this.JWTService.signAsync(
        {
          sub: id,
          user_name, // Возвращаем имя пользователя
        },
        {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_KEY,
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
