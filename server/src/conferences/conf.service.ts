import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Conferences } from './entities/conf.entities';
import { CreateConferenceDto } from './dto/create-conf.dto';


@Injectable()
export class ConferenceService {
  async createConference(
    createConferenceDto: CreateConferenceDto,
  ): Promise<Conferences> {
    try {
      return await Conferences.create(createConferenceDto);
    } catch (error) {
      throw new HttpException(
        'Не удалось создать конференцию',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getConferencesByGroup(groupId: number): Promise<Conferences[]> {
    return await Conferences.findAll({ where: { groupId } });
  }

  async endConference(conferenceId: number): Promise<void> {
    const conference = await Conferences.findByPk(conferenceId);
    if (!conference) {
      throw new HttpException('Конференция не найдена', HttpStatus.NOT_FOUND);
    }
    await conference.destroy();
  }
}
