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

import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from '../models/dto/create-transaction.dto';
import { UpdateTransactionDTO } from '../models/dto/update-transaction.dto';
import { Transaction } from '../models/transaction.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('transaction')
//@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('TransactionController');
  }

  @Get()
  findAll(): Promise<Transaction[]> {
    this.appLoggerService.log(
      'Return all the transactions',
      'TransactionController'
    );
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Transaction> {
    this.appLoggerService.log(
      'Return one transaction',
      'TransactionController'
    );
    return this.transactionService.findOne(id);
  }

  @Get('type-account/:type/:account')
  findTransactionsByAccountType(
    @Param('account') account: number,
    @Param('type') type: string
  ): Promise<Transaction[]> {
    this.appLoggerService.log(
      'Return all the transactions by the account and type',
      'TransactionController'
    );
    return this.transactionService.findTransactionsByAccountType(account, type);
  }

  @Get('account/:account')
  findTransactionsByAccount(
    @Param('account') account: number
  ): Promise<Transaction[]> {
    this.appLoggerService.log(
      'Return all the transactions by the account',
      'TransactionController'
    );
    return this.transactionService.findTransactionsByAccount(account);
  }

  @Get('total-points-user/:user/')
  getTotalPointsUser(@Param('user') user: number): Promise<number> {
    this.appLoggerService.log(
      'Return all the points of an user',
      'TransactionController'
    );
    return this.transactionService.getTotalPointsUser(user);
  }

  @Post()
  async create(
    @Body() transactionData: CreateTransactionDTO
  ): Promise<Transaction> {
    this.appLoggerService.log('Create a transaction', 'TransactionController');
    return this.transactionService.create(transactionData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transactionData: UpdateTransactionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a transaction', 'TransactionController');
    return this.transactionService.update(Number(id), transactionData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a transaction', 'TransactionController');
    return this.transactionService.delete(id);
  }
}
