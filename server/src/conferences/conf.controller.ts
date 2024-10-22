import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ConferenceService } from './conf.service';
import { CreateConferenceDto } from './dto/create-conf.dto';
import { Conferences } from './entities/conf.entities';

@Controller('conferences')
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Post()
  create(
    @Body() createConferenceDto: CreateConferenceDto,
  ): Promise<Conferences> {
    return this.conferenceService.createConference(createConferenceDto);
  }

  @Get(':groupId')
  findAll(@Param('groupId') groupId: number): Promise<Conferences[]> {
    return this.conferenceService.getConferencesByGroup(groupId);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.conferenceService.endConference(id);
  }
}
