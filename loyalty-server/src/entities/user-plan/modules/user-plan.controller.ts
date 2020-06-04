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

import { UserPlanService } from './user-plan.service';
import { CreateUserPlanDTO } from '../models/dto/create-user-plan.dto';
import { UpdateUserPlanDTO } from '../models/dto/update-user-plan.dto';
import { UserPlan } from '../models/user-plan.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('user-plan')
//@UseGuards(AuthGuard('jwt'))
export class UserPlanController {
  constructor(
    private userPlanService: UserPlanService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('UserPlanController');
  }

  @Get()
  findAll(): Promise<UserPlan[]> {
    this.appLoggerService.log(
      'Return all the user-plans',
      'UserPlanController'
    );
    return this.userPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserPlan> {
    this.appLoggerService.log('Return one user-plan', 'UserPlanController');
    return this.userPlanService.findOne(id);
  }

  @Post()
  async create(@Body() userPlanData: CreateUserPlanDTO): Promise<UserPlan> {
    this.appLoggerService.log('Create a user-plan', 'UserPlanController');
    return this.userPlanService.create(userPlanData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userPlanData: UpdateUserPlanDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update one user-plan', 'UserPlanController');
    return this.userPlanService.update(Number(id), userPlanData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete one user-plan', 'UserPlanController');
    return this.userPlanService.delete(id);
  }
}
