import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateTransactionStatusDTO } from '../models/dto/create-transaction-status.dto';
import { UpdateTransactionStatusDTO } from '../models/dto/update-transaction-status.dto';
import { TransactionStatus } from '../models/transaction-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class TransactionStatusService {
  constructor(
    @InjectRepository(TransactionStatus)
    private transactionStatusRepository: Repository<TransactionStatus>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('TransactionStatusService');
  }

  async findOne(id: number): Promise<TransactionStatus> {
    this.appLoggerService.log(
      `Return one transaction-status: ${id}`,
      'TransactionStatusService'
    );
    return await this.transactionStatusRepository.findOne(id, {
      relations: ['transaction', 'status'],
    });
  }

  async findAll(): Promise<TransactionStatus[]> {
    this.appLoggerService.log(
      'Return all the transaction-status',
      'TransactionStatusService'
    );
    return await this.transactionStatusRepository.find({
      relations: ['transaction', 'status'],
    });
  }

  async findAllByStatus(status): Promise<TransactionStatus[]> {
    this.appLoggerService.log(
      `Return all the transaction-status by status: ${status}`,
      `TransactionStatusService`
    );
    return await this.transactionStatusRepository.find({
      relations: [`transaction`],
      where: { status },
    });
  }

  async findLastTransactionStatus(id: number): Promise<TransactionStatus> {
    this.appLoggerService.log(
      `Return last transaction-status: ${id}`,
      'TransactionStatusService'
    );
    return await this.transactionStatusRepository.findOne({
      where: { transaction: id },
      relations: [`status`],
      order: {
        dateCreation: 'DESC',
      },
    });
  }

  async create(
    transactionStatusData: CreateTransactionStatusDTO
  ): Promise<TransactionStatus> {
    this.appLoggerService.log(
      'Create a transaction-status',
      'TransactionStatusService'
    );
    return await this.transactionStatusRepository.save(transactionStatusData);
  }

  async update(
    id: number,
    transactionStatusData: UpdateTransactionStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a transaction-status: ${id}`,
      `TransactionStatusService`
    );
    return await this.transactionStatusRepository.update(
      id,
      transactionStatusData
    );
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a transaction-status: ${id}`,
      `TransactionStatusService`
    );
    return await this.transactionStatusRepository.delete(id);
  }
}
