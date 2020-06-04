import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateAmountDTO } from '../models/dto/create-amount.dto';
import { UpdateAmountDTO } from '../models/dto/update-amount.dto';
import { Amount } from '../models/amount.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class AmountService {
  constructor(
    @InjectRepository(Amount)
    private amountRepository: Repository<Amount>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AmountService');
  }

  async findOne(id: number): Promise<Amount> {
    this.appLoggerService.log(`Return one amount: ${id}`, `AmountService`);
    return await this.amountRepository.findOne(id);
  }

  async findAll(): Promise<Amount[]> {
    this.appLoggerService.log(`Return all the amounts`, `AmountService`);
    return await this.amountRepository.find();
  }

  async create(amountData: CreateAmountDTO): Promise<Amount> {
    this.appLoggerService.log(
      `Create an amount: ${amountData.addedAmount}`,
      `AmountService`
    );
    return await this.amountRepository.save(amountData);
  }

  async update(id: number, amountData: UpdateAmountDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update an amount: ${id}`, `AmountService`);
    return await this.amountRepository.update(id, amountData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete an amount: ${id}`, `AmountService`);
    return await this.amountRepository.delete(id);
  }
}
