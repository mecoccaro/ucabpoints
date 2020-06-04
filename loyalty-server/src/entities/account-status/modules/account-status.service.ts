import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { UpdateAccountStatusDTO } from '../models/dto/update.account-status.dto';
import { CreateAccountStatusDTO } from '../models/dto/create-account-status.dto';
import { AccountStatus } from '../models/account-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class AccountStatusService {
  constructor(
    @InjectRepository(AccountStatus)
    private accountStatusRepository: Repository<AccountStatus>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AccountStatusService');
  }

  async findOne(id: number): Promise<AccountStatus> {
    this.appLoggerService.log(
      `Return one account-status: ${id}`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.findOne(id, {
      relations: [`account`, `status`],
    });
  }

  async findAll(): Promise<AccountStatus[]> {
    this.appLoggerService.log(
      `Return all the account-status`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.find({
      relations: [`account`, `status`],
    });
  }

  async findAllByStatus(status): Promise<AccountStatus[]> {
    this.appLoggerService.log(
      `Return all the account-status by status: ${status}`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.find({
      relations: [`account`],
      where: { status },
    });
  }

  async findLastAccountStatus(id: number): Promise<AccountStatus> {
    this.appLoggerService.log(
      `Return last account-status: ${id}`,
      'AccountStatusService'
    );
    return await this.accountStatusRepository.findOne({
      where: { account: id },
      relations: [`status`],
      order: {
        dateCreation: 'DESC',
      },
    });
  }

  async create(
    accountStatusData: CreateAccountStatusDTO
  ): Promise<AccountStatus> {
    this.appLoggerService.log(
      `Create an account-status`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.save(accountStatusData);
  }

  async update(
    id: number,
    accountStatusData: UpdateAccountStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update an account-status: ${id}`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.update(id, accountStatusData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete an account-status: ${id}`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.delete(id);
  }

  async deleteByAccount(accountId: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete an account-status by account: ${accountId}`,
      `AccountStatusService`
    );
    return await this.accountStatusRepository.delete({ account: accountId });
  }
}
