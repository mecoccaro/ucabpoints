import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreatePrivilegeDTO } from '../models/dto/create-privilege.dto';
import { UpdatePrivilegeDTO } from '../models/dto/update-privilege.dto';
import { Privilege } from '../models/privilege.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PrivilegeService');
  }

  async findOne(id: number): Promise<Privilege> {
    this.appLoggerService.log(
      `Return one privilege: ${id}`,
      `PrivilegeService`
    );
    return await this.privilegeRepository.findOne(id);
  }

  async findAll(): Promise<Privilege[]> {
    this.appLoggerService.log(`Return all the privileges`, `PrivilegeService`);
    return await this.privilegeRepository.find();
  }

  async create(privilegeData: CreatePrivilegeDTO): Promise<Privilege> {
    this.appLoggerService.log(
      `Create a privilege: ${privilegeData.name}`,
      `PrivilegeService`
    );
    return await this.privilegeRepository.save(privilegeData);
  }

  async update(
    id: number,
    privilegeData: UpdatePrivilegeDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a privilege: ${id}`, `PrivilegeService`);
    return await this.privilegeRepository.update(id, privilegeData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a privilege: ${id}`, `PrivilegeService`);
    return await this.privilegeRepository.delete(id);
  }
}
