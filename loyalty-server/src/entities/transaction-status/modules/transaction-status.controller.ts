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

import { TransactionStatusService } from './transaction-status.service';
import { CreateTransactionStatusDTO } from '../models/dto/create-transaction-status.dto';
import { UpdateTransactionStatusDTO } from '../models/dto/update-transaction-status.dto';
import { TransactionStatus } from '../models/transaction-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('transaction-status')
//@UseGuards(AuthGuard('jwt'))
export class TransactionStatusController {
  constructor(
    private transactionStatusService: TransactionStatusService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('TransactionStatusController');
  }

  @Get()
  findAll(): Promise<TransactionStatus[]> {
    this.appLoggerService.log(
      'Return all the transaction-status',
      'TransactionStatusController'
    );
    return this.transactionStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TransactionStatus> {
    this.appLoggerService.log(
      'Return one transaction-status',
      'TransactionStatusController'
    );
    return this.transactionStatusService.findOne(id);
  }

  @Get('last/:id')
  findLastTransactionStatus(
    @Param('id') id: number
  ): Promise<TransactionStatus> {
    this.appLoggerService.log(
      `Return last transaction-status`,
      'TransactionStatusController'
    );
    return this.transactionStatusService.findLastTransactionStatus(id);
  }

  @Post()
  async create(
    @Body() transactionStatusData: CreateTransactionStatusDTO
  ): Promise<TransactionStatus> {
    this.appLoggerService.log(
      'Create a transaction-status',
      'TransactionStatusController'
    );
    return this.transactionStatusService.create(transactionStatusData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transactionStatusData: UpdateTransactionStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      'Update a transaction-status',
      'TransactionStatusController'
    );
    return this.transactionStatusService.update(
      Number(id),
      transactionStatusData
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      'Delete a transaction-status',
      'TransactionStatusController'
    );
    return this.transactionStatusService.delete(id);
  }
}
