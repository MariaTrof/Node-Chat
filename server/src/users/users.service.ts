import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error); // Логируем ошибку
      throw new HttpException(
        'Не удалось создать пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        'Ошибка при получении всех пользователей',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async findOne(id: number): Promise<Users | null> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException(
          'Не удалось получить пользователя',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        'Ошибка при получении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException(
          `Пользователь c id: ${id} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }
      await user.update(updateUserDto);
      return user;
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        'Ошибка при изменении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException(
          `Пользователь c id: ${id} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }
      await user.destroy();
      return { message: `Пользователь с id: ${id} удален` };
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        'Ошибка при удалении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async getByName(user_name: string): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_name },
      });
      return user;
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        'Ошибка при получении пользователя по user_name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
