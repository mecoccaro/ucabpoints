import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateBenefitDTO } from '../models/dto/create-benefit.dto';
import { UpdateBenefitDTO } from '../models/dto/update-benefit.dto';
import { Benefit } from '../models/benefit.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class BenefitService {
  constructor(
    @InjectRepository(Benefit)
    private benefitRepository: Repository<Benefit>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('BenefitService');
  }

  async findOne(id: number): Promise<Benefit> {
    this.appLoggerService.log(`Return one benefit: ${id}`, `BenefitService`);
    return await this.benefitRepository.findOne(id);
  }

  async findAll(): Promise<Benefit[]> {
    this.appLoggerService.log(`Return all the benefits`, `BenefitService`);
    return await this.benefitRepository.find();
  }

  async create(benefitData: CreateBenefitDTO): Promise<Benefit> {
    this.appLoggerService.log(`Create a benefit`, `BenefitService`);
    return await this.benefitRepository.save(benefitData);
  }

  async update(
    id: number,
    benefitData: UpdateBenefitDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a benefit: ${id}`, `BenefitService`);
    return await this.benefitRepository.update(id, benefitData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a benefit: ${id}`, `BenefitService`);
    return await this.benefitRepository.delete(id);
  }
}
