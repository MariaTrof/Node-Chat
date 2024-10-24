import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { ATGuard, RTGuard } from 'src/auth/guards';


@ApiTags('Users')
@Controller('users')
@UseGuards(ATGuard)
@UseGuards(RTGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    try {
        console.log('Создаваемый пользователь:', {
        ...createUserDto,
      });
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
    
      throw new HttpException(
        error.message || 'Не удалось создать пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Users | null> {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        error.message || 'Не удалось получить пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':name')
  async getByName(
    @Param('user_name') user_name: string,
  ): Promise<Users | null> {
    try {
      return await this.usersService.getByName(user_name);
    } catch (error) {
      console.log(error);
      console.error('Error creating user:', error);
      throw new HttpException(
        error.message || 'Не удалось получить пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
