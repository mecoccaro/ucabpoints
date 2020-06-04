import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateCommissionDTO } from '../models/dto/create-commission.dto';
import { UpdateCommissionDTO } from '../models/dto/update-commission.dto';
import { Commission } from '../models/commission.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private commissionRepository: Repository<Commission>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('CommissionService');
  }

  async findLastCommission(): Promise<Commission> {
    this.appLoggerService.log('Return last commission', 'CommissionService');
    return await this.commissionRepository.findOne({
      order: {
        dateOfCreation: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Commission> {
    this.appLoggerService.log(
      `Return one commission: ${id}`,
      `CommissionService`
    );
    return await this.commissionRepository.findOne(id);
  }

  async findAll(): Promise<Commission[]> {
    this.appLoggerService.log(
      `Return all the commissions`,
      `CommissionService`
    );
    return await this.commissionRepository.find();
  }

  async create(commissionData: CreateCommissionDTO): Promise<Commission> {
    this.appLoggerService.log(`Create a commission`, `CommissionService`);
    return await this.commissionRepository.save(commissionData);
  }

  async update(
    id: number,
    commissionData: UpdateCommissionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a commission: ${id}`,
      `CommissionService`
    );
    return await this.commissionRepository.update(id, commissionData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a commission: ${id}`,
      `CommissionService`
    );
    return await this.commissionRepository.delete(id);
  }
}
