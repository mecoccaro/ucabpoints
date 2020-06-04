import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateStatusDTO } from '../models/dto/create-status.dto';
import { UpdateStatusDTO } from '../models/dto/update-status.dto';
import { Status } from '../models/status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('StatusService');
  }

  async findOne(id: number): Promise<Status> {
    this.appLoggerService.log(`Return one status: ${id}`, `StatusService`);
    return await this.statusRepository.findOne(id);
  }

  async findAll(): Promise<Status[]> {
    this.appLoggerService.log(`Return all the status`, `StatusService`);
    return await this.statusRepository.find();
  }

  async findOneByNameType(name: string, type: string): Promise<Status> {
    this.appLoggerService.log(
      `Return one status by name and type: ${name} - ${type}`,
      `StatusService`
    );
    return await this.statusRepository.findOne({ name, statusType: type });
  }

  async create(statusData: CreateStatusDTO): Promise<Status> {
    this.appLoggerService.log(
      `Create a status: ${statusData.name} - ${statusData.statusType}`,
      `StatusService`
    );
    return await this.statusRepository.save(statusData);
  }

  async update(id: number, statusData: UpdateStatusDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a status: ${id}`, `StatusService`);
    return await this.statusRepository.update(id, statusData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a status: ${id}`, `StatusService`);
    return await this.statusRepository.delete(id);
  }
}
