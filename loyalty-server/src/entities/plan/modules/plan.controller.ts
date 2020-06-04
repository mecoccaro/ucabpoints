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

import { PlanService } from './plan.service';
import { CreatePlanDTO } from '../models/dto/create-plan.dto';
import { UpdatePlanDTO } from '../models/dto/update-plan.dto';
import { Plan } from '../models/plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('plan')
// @UseGuards(AuthGuard('jwt'))
export class PlanController {
  constructor(
    private planService: PlanService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PlanController');
  }

  @Get()
  findAll(): Promise<Plan[]> {
    this.appLoggerService.log('Return all the plans', 'PlanController');
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Plan> {
    this.appLoggerService.log('Return one plan', 'PlanController');
    return this.planService.findOne(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string): Promise<Plan> {
    this.appLoggerService.log('Return one plan by name', 'PlanController');
    return this.planService.findOneByName(name);
  }

  @Post()
  async create(@Body() planData: CreatePlanDTO): Promise<Plan> {
    this.appLoggerService.log('Create a plan', 'PlanController');
    return this.planService.create(planData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() planData: UpdatePlanDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a plan', 'PlanController');
    return this.planService.update(Number(id), planData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a plan', 'PlanController');
    return this.planService.delete(id);
  }
}
