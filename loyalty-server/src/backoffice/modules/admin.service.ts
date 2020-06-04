import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { AppLoggerService } from '../../logger/app-logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../../entities/person/models/person.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('adminService');
  }

  /*async findOne(id: number): Promise<Person>{
        this.appLoggerService.log('Returning one administrator', 'adminService');
        return await this.personRepository.findOne(id);
    }*/
}
