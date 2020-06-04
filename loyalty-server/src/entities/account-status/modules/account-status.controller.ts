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

import { AccountStatusService } from './account-status.service';
import { CreateAccountStatusDTO } from '../models/dto/create-account-status.dto';
import { UpdateAccountStatusDTO } from '../models/dto/update.account-status.dto';
import { AccountStatus } from '../models/account-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('account-status')
//@UseGuards(AuthGuard('jwt'))
export class AccountStatusController {
  constructor(
    private accountStatusService: AccountStatusService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AccountStatusController');
  }

  @Get()
  findAll(): Promise<AccountStatus[]> {
    this.appLoggerService.log(
      'Return all the account-status',
      'AccountStatusController'
    );
    return this.accountStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AccountStatus> {
    this.appLoggerService.log(
      'Return one account-status',
      'AccountStatusController'
    );
    return this.accountStatusService.findOne(id);
  }

  @Get('last/:id')
  findLastAccountStatus(@Param('id') id: number): Promise<AccountStatus> {
    this.appLoggerService.log(
      `Return last account-status`,
      'AccountStatusService'
    );
    return this.accountStatusService.findLastAccountStatus(id);
  }

  @Post()
  async create(
    @Body() accountStatusData: CreateAccountStatusDTO
  ): Promise<AccountStatus> {
    this.appLoggerService.log(
      'Create an account-status',
      'AccountStatusController'
    );
    return this.accountStatusService.create(accountStatusData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() accountStatusData: UpdateAccountStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      'Update an account-status',
      'AccountStatusController'
    );
    return this.accountStatusService.update(Number(id), accountStatusData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      'Delete an account-status',
      'AccountStatusController'
    );
    return this.accountStatusService.delete(id);
  }

  @Delete('account/:account')
  async deleteByAccount(
    @Param('account') account: number
  ): Promise<DeleteResult> {
    this.appLoggerService.log(
      'Delete an account-status by account',
      'AccountStatusController'
    );
    return this.accountStatusService.deleteByAccount(account);
  }
}
