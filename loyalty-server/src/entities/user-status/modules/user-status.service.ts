import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateUserStatusDTO } from '../models/dto/create-user-status.dto';
import { UpdateUserStatusDTO } from '../models/dto/update-user-status.dto';
import { UserStatus } from '../models/user-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatus)
    private userStatusRepository: Repository<UserStatus>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('UserStatusService');
  }

  async findOneByUser(userId: number): Promise<UserStatus> {
    this.appLoggerService.log(
      `Return one user-status by user: ${userId}`,
      'UserStatusService'
    );
    return await this.userStatusRepository.findOne(
      { user: userId },
      {
        relations: ['user', 'status'],
      }
    );
  }

  async findOne(id: number): Promise<UserStatus> {
    this.appLoggerService.log(
      `Return one user-status: ${id}`,
      'UserStatusService'
    );
    return await this.userStatusRepository.findOne(id, {
      relations: ['user', 'status'],
    });
  }

  async findAll(): Promise<UserStatus[]> {
    this.appLoggerService.log(
      'Return all the user-status',
      'UserStatusService'
    );
    return await this.userStatusRepository.find({
      relations: ['user', 'status'],
    });
  }

  async create(userStatusData: CreateUserStatusDTO): Promise<UserStatus> {
    this.appLoggerService.log('Create a user-status', 'UserStatusService');
    return await this.userStatusRepository.save(userStatusData);
  }

  async update(
    id: number,
    userStatusData: UpdateUserStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a user-status: ${id}`,
      `UserStatusService`
    );
    return await this.userStatusRepository.update(id, userStatusData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a user-status: ${id}`,
      `UserStatusService`
    );
    return await this.userStatusRepository.delete(id);
  }
}
