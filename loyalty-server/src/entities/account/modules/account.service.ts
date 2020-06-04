import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, In } from 'typeorm';

import { CreateAccountDTO } from '../models/dto/create-account.dto';
import { UpdateAccountDTO } from '../models/dto/update-account.dto';
import { Account } from '../models/account.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { StatusService } from 'src/entities/status/modules/status.service';
import { AccountStatusService } from 'src/entities/account-status/modules/account-status.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private appLoggerService: AppLoggerService,
    private statusService: StatusService,
    private accountStatusService: AccountStatusService
  ) {
    this.appLoggerService.setContext(`AccountService`);
  }

  async findOne(id: number): Promise<Account> {
    this.appLoggerService.log(`Return one account: ${id}`, `AccountService`);
    return await this.accountRepository.findOne(id);
  }

  async findAll(): Promise<Account[]> {
    this.appLoggerService.log(`Return all the accounts`, `AccountService`);
    return await this.accountRepository.find();
  }

  findPrimaryFromUser(user: number): Promise<Account> {
    this.appLoggerService.log(
      `Return the primary account of an user: ${user}`,
      'AccountController'
    );
    return this.accountRepository.findOne({ primary: 'T', user });
  }

  async findAllByUser(user: number): Promise<Account[]> {
    this.appLoggerService.log(
      `Return all the accounts of an user: ${user}`,
      `AccountService`
    );
    return await this.accountRepository.find({ user });
  }

  async findAllByUserStatus(user: number, status: string): Promise<Account[]> {
    this.appLoggerService.log(
      `Return all the accounts of an user and status: ${user}`,
      `AccountService`
    );
    const statusResult = await this.statusService.findOneByNameType(
      status,
      'ACCOUNT'
    );
    const accountStatus = await this.accountStatusService.findAllByStatus(
      statusResult.id
    );

    let accountStatusArray = new Array();
    let accountStatusArrayId = new Array();
    for (let i = 0; i < accountStatus.length; i++) {
      accountStatusArray.push(accountStatus[i].account);
    }
    for (let i = 0; i < accountStatusArray.length; i++) {
      accountStatusArrayId.push(accountStatusArray[i].id);
    }

    return await this.accountRepository.find({
      id: In(accountStatusArrayId),
      user,
    });
  }

  async create(accountData: CreateAccountDTO): Promise<Account> {
    this.appLoggerService.log(
      `Create an account: ${accountData.accountNumber}`,
      `AccountService`
    );
    return await this.accountRepository.save(accountData);
  }

  async update(
    id: number,
    accountData: UpdateAccountDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(`Update an account: ${id}`, `AccountService`);
    return await this.accountRepository.update(id, accountData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete an account: ${id}`, `AccountService`);
    return await this.accountRepository.delete(id);
  }
}
