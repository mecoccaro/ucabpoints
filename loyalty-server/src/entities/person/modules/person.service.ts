import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreatePersonDTO } from '../models/dto/create-person.dto';
import { UpdatePersonDTO } from '../models/dto/update-person.dto';
import { Person } from '../models/person.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PersonService');
  }

  async findOne(id: number): Promise<Person> {
    this.appLoggerService.log(`Return one person: ${id}`, `PersonService`);
    return await this.personRepository.findOne(id);
  }

  async findAll(): Promise<Person[]> {
    this.appLoggerService.log(`Return all the persons`, `PersonService`);
    return await this.personRepository.find({ relations: ['user', 'place'] });
  }

  async findOneByUser(user: number): Promise<Person> {
    this.appLoggerService.log(
      `Return one person by user: ${user}`,
      `PersonService`
    );
    return await this.personRepository.findOne({ user });
  }

  async create(personData: CreatePersonDTO): Promise<Person> {
    this.appLoggerService.log(
      `Create a person: ${personData.firstLastname}`,
      `PersonService`
    );
    return await this.personRepository.save(personData);
  }

  async update(id: number, personData: UpdatePersonDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a person: ${id}`, `PersonService`);
    return await this.personRepository.update(id, personData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a person: ${id}`, `PersonService`);
    return await this.personRepository.delete(id);
  }
}
