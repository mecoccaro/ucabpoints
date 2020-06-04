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

import { BenefitService } from './benefit.service';
import { UpdateBenefitDTO } from '../models/dto/update-benefit.dto';
import { CreateBenefitDTO } from '../models/dto/create-benefit.dto';
import { Benefit } from '../models/benefit.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('benefit')
@UseGuards(AuthGuard('jwt'))
export class BenefitController {
  constructor(
    private benefitService: BenefitService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('BenefitController');
  }

  @Get()
  findAll(): Promise<Benefit[]> {
    this.appLoggerService.log('Return all the benefits', 'BenefitController');
    return this.benefitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Benefit> {
    this.appLoggerService.log('Return one benefit', 'BenefitController');
    return this.benefitService.findOne(id);
  }

  @Post()
  async create(@Body() benefitData: CreateBenefitDTO): Promise<Benefit> {
    this.appLoggerService.log('Create a benefit', 'BenefitController');
    return this.benefitService.create(benefitData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() benefitData: UpdateBenefitDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a benefit', 'BenefitController');
    return this.benefitService.update(Number(id), benefitData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a benefit', 'BenefitController');
    return this.benefitService.delete(id);
  }
}
