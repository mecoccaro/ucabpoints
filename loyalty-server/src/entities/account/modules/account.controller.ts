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

import { AccountService } from './account.service';
import { Account } from '../models/account.entity';
import { CreateAccountDTO } from '../models/dto/create-account.dto';
import { UpdateAccountDTO } from '../models/dto/update-account.dto';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('account')
//@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(
    private accountService: AccountService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AccountController');
  }

  @Get()
  findAll(): Promise<Account[]> {
    this.appLoggerService.log('Return all the accounts', 'AccountController');
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Account> {
    this.appLoggerService.log('Return one account', 'AccountController');
    return this.accountService.findOne(id);
  }

  @Get('primary/:user')
  findPrimaryFromUser(@Param('user') user: number): Promise<Account> {
    this.appLoggerService.log(
      'Return the primary account of an user',
      'AccountController'
    );
    return this.accountService.findPrimaryFromUser(user);
  }

  @Get('all-user/:user')
  findAllByUser(@Param('user') user: number): Promise<Account[]> {
    this.appLoggerService.log(
      'Return all the accounts of an user',
      'AccountController'
    );
    return this.accountService.findAllByUser(user);
  }

  @Get('all-userstatus/:user/:status')
  findAllByUserStatus(
    @Param('user') user: number,
    @Param('status') status: string
  ): Promise<Account[]> {
    this.appLoggerService.log(
      'Return all the accounts of an user and status',
      'AccountController'
    );
    return this.accountService.findAllByUserStatus(user, status);
  }

  @Post()
  async create(@Body() accountData: CreateAccountDTO): Promise<Account> {
    this.appLoggerService.log('Create an account', 'AccountController');
    return this.accountService.create(accountData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() accountData: UpdateAccountDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Udate an account', 'AccountController');
    return this.accountService.update(Number(id), accountData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete an account', 'AccountController');
    return this.accountService.delete(id);
  }
}
