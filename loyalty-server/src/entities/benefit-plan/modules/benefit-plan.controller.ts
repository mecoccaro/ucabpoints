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

import { BenefitPlanService } from './benefit-plan.service';
import { CreateBenefitPlanDTO } from '../models/dto/create-benefit-plan.dto';
import { UpdateBenefitPlanDTO } from '../models/dto/update-benefit-plan.dto';
import { BenefitPlan } from '../models/benefit-plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('benefit-plan')
@UseGuards(AuthGuard('jwt'))
export class BenefitPlanController {
  constructor(
    private benefitPlanService: BenefitPlanService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('BenefitPlanController');
  }

  @Get()
  findAll(): Promise<BenefitPlan[]> {
    this.appLoggerService.log(
      'Return all the benefit-plans',
      'BenefitPlanController'
    );
    return this.benefitPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<BenefitPlan> {
    this.appLoggerService.log(
      'Return one benefit-plan',
      'BenefitPlanController'
    );
    return this.benefitPlanService.findOne(id);
  }

  @Post()
  async create(
    @Body() benefitPlanData: CreateBenefitPlanDTO
  ): Promise<BenefitPlan> {
    this.appLoggerService.log('Create a benefit-plan', 'BenefitPlanController');
    return this.benefitPlanService.create(benefitPlanData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() benefitPlanData: UpdateBenefitPlanDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a benefit-plan', 'BenefitPlanController');
    return this.benefitPlanService.update(Number(id), benefitPlanData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a benefit-plan', 'BenefitPlanController');
    return this.benefitPlanService.delete(id);
  }
}
