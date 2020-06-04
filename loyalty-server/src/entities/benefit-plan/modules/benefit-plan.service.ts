import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateBenefitPlanDTO } from '../models/dto/create-benefit-plan.dto';
import { UpdateBenefitPlanDTO } from '../models/dto/update-benefit-plan.dto';
import { BenefitPlan } from '../models/benefit-plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class BenefitPlanService {
  constructor(
    @InjectRepository(BenefitPlan)
    private benefitPlanRepository: Repository<BenefitPlan>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('BenefitPlanService');
  }

  async findOne(id: number): Promise<BenefitPlan> {
    this.appLoggerService.log(
      `Return one benefit-plan: ${id}`,
      'BenefitPlanService'
    );
    return await this.benefitPlanRepository.findOne(id, {
      relations: ['benefit', 'plan'],
    });
  }

  async findAll(): Promise<BenefitPlan[]> {
    this.appLoggerService.log(
      `Return all the benefit-plans`,
      `BenefitPlanService`
    );
    return await this.benefitPlanRepository.find({
      relations: ['benefit', 'plan'],
    });
  }

  async create(benefitPlanData: CreateBenefitPlanDTO): Promise<BenefitPlan> {
    this.appLoggerService.log(`Create a benefit-plan`, `BenefitPlanService`);
    return await this.benefitPlanRepository.save(benefitPlanData);
  }

  async update(
    id: number,
    benefitPlanData: UpdateBenefitPlanDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a benefit-plan: ${id}`,
      `BenefitPlanService`
    );
    return await this.benefitPlanRepository.update(id, benefitPlanData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a benefit-plan: ${id}`,
      `BenefitPlanService`
    );
    return await this.benefitPlanRepository.delete(id);
  }
}
