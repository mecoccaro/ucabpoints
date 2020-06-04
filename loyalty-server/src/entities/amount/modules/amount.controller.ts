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

import { AmountService } from './amount.service';
import { CreateAmountDTO } from '../models/dto/create-amount.dto';
import { UpdateAmountDTO } from '../models/dto/update-amount.dto';
import { Amount } from '../models/amount.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('amount')
//@UseGuards(AuthGuard('jwt'))
export class AmountController {
  constructor(
    private amountService: AmountService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AmountController');
  }

  @Get()
  findAll(): Promise<Amount[]> {
    this.appLoggerService.log('Return all the amounts', 'AmountController');
    return this.amountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Amount> {
    this.appLoggerService.log('Return one amount', 'AmountController');
    return this.amountService.findOne(id);
  }

  @Post()
  async create(@Body() amountData: CreateAmountDTO): Promise<Amount> {
    this.appLoggerService.log('Create an amount', 'AmountController');
    return this.amountService.create(amountData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() amountData: UpdateAmountDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update an amount', 'AmountController');
    return this.amountService.update(Number(id), amountData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete an amount', 'AmountController');
    return this.amountService.delete(id);
  }
}
