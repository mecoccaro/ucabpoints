import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { PersonService } from './person.service';
import { UpdatePersonDTO } from '../models/dto/update-person.dto';
import { CreatePersonDTO } from '../models/dto/create-person.dto';
import { Person } from '../models/person.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('person')
//@UseGuards(AuthGuard('jwt'))
export class PersonController {
  constructor(
    private personService: PersonService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PersonController');
  }

  @Get()
  findAll(): Promise<Person[]> {
    this.appLoggerService.log('Return all the persons', 'PersonController');
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Person> {
    this.appLoggerService.log('Return one person', 'PersonController');
    return this.personService.findOne(id);
  }

  @Get('user/:user')
  findOneByUser(@Param('user') user: number): Promise<Person> {
    this.appLoggerService.log('Return one person by user', 'PersonController');
    return this.personService.findOneByUser(user);
  }

  @Post()
  async create(@Body() personData: CreatePersonDTO): Promise<Person> {
    this.appLoggerService.log('Create a person', 'PersonController');
    return this.personService.create(personData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() personData: UpdatePersonDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a person', 'PersonController');
    return this.personService.update(Number(id), personData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a person', 'PersonController');
    return this.personService.delete(id);
  }
}
