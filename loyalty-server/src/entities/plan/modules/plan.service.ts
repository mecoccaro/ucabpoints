import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreatePlanDTO } from '../models/dto/create-plan.dto';
import { UpdatePlanDTO } from '../models/dto/update-plan.dto';
import { Plan } from '../models/plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PlanService');
  }

  async findOne(id: number): Promise<Plan> {
    this.appLoggerService.log(`Return one plan: ${id}`, `PlanService`);
    return await this.planRepository.findOne(id);
  }

  async findAll(): Promise<Plan[]> {
    this.appLoggerService.log(`Return all the plans`, `PlanService`);
    return await this.planRepository.find();
  }

  async findOneByName(name: string): Promise<Plan> {
    this.appLoggerService.log(
      `Return one plan by name: ${name}`,
      `PlanService`
    );
    return await this.planRepository.findOne({ name });
  }

  async create(planData: CreatePlanDTO): Promise<Plan> {
    this.appLoggerService.log(`Create a plan: ${planData.name}`, `PlanService`);
    return await this.planRepository.save(planData);
  }

  async update(id: number, planData: UpdatePlanDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a plan: ${id}`, `PlanService`);
    return await this.planRepository.update(id, planData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a plan: ${id}`, `PlanService`);
    return await this.planRepository.delete(id);
  }
}
