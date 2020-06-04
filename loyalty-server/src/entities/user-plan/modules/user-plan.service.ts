import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateUserPlanDTO } from '../models/dto/create-user-plan.dto';
import { UpdateUserPlanDTO } from '../models/dto/update-user-plan.dto';
import { UserPlan } from '../models/user-plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class UserPlanService {
  constructor(
    @InjectRepository(UserPlan)
    private userPlanRepository: Repository<UserPlan>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('UserPlanService');
  }

  async findOne(id: number): Promise<UserPlan> {
    this.appLoggerService.log(`Return one user-plan: ${id}`, 'UserPlanService');
    return await this.userPlanRepository.findOne(id, {
      relations: ['user', 'plan'],
    });
  }

  async findAll(): Promise<UserPlan[]> {
    this.appLoggerService.log('Return all the user-plans', 'UserPlanService');
    return await this.userPlanRepository.find({
      relations: ['user', 'plan'],
    });
  }

  async create(userPlanData: CreateUserPlanDTO): Promise<UserPlan> {
    this.appLoggerService.log('Create a user-plan', 'UserPlanService');
    return await this.userPlanRepository.save(userPlanData);
  }

  async update(
    id: number,
    userPlanData: UpdateUserPlanDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(`Update one user-plan: ${id}`, `UserPlanService`);
    return await this.userPlanRepository.update(id, userPlanData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete one user-plan: ${id}`, `UserPlanService`);
    return await this.userPlanRepository.delete(id);
  }
}
