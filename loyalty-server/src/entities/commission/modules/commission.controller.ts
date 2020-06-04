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

import { CommissionService } from './commission.service';
import { CreateCommissionDTO } from '../models/dto/create-commission.dto';
import { UpdateCommissionDTO } from '../models/dto/update-commission.dto';
import { Commission } from '../models/commission.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('commission')
//@UseGuards(AuthGuard('jwt'))
export class CommissionController {
  constructor(
    private commissionService: CommissionService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('CommissionController');
  }

  @Get()
  findAll(): Promise<Commission[]> {
    this.appLoggerService.log(
      'Return all the commissions',
      'CommissionController'
    );
    return this.commissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Commission> {
    this.appLoggerService.log('Return one commission', 'CommissionController');
    return this.commissionService.findOne(id);
  }

  @Get('last/commission')
  async findLastCommission(): Promise<Commission> {
    this.appLoggerService.log('Return last commission', 'CommissionController');
    return await this.commissionService.findLastCommission();
  }

  @Post()
  async create(
    @Body() commissionData: CreateCommissionDTO
  ): Promise<Commission> {
    this.appLoggerService.log('Create a commission', 'CommissionController');
    return this.commissionService.create(commissionData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() commissionData: UpdateCommissionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a commission', 'CommissionController');
    return this.commissionService.update(Number(id), commissionData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a commission', 'CommissionController');
    return this.commissionService.delete(id);
  }
}
