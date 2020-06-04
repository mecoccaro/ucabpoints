import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateConversionDTO } from '../models/dto/create-conversion.dto';
import { UpdateConversionDTO } from '../models/dto/update-conversion.dto';
import { Conversion } from '../models/conversion.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class ConversionService {
  constructor(
    @InjectRepository(Conversion)
    private conversionRepository: Repository<Conversion>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('ConversionService');
  }

  async findOne(id: number): Promise<Conversion> {
    this.appLoggerService.log(
      `Return one conversion: ${id}`,
      `ConversionService`
    );
    return await this.conversionRepository.findOne(id);
  }

  async findAll(): Promise<Conversion[]> {
    this.appLoggerService.log(
      `Return all the conversions`,
      `ConversionService`
    );
    return await this.conversionRepository.find();
  }

  async create(conversionData: CreateConversionDTO): Promise<Conversion> {
    this.appLoggerService.log(`Create a conversion`, `ConversionService`);
    return await this.conversionRepository.save(conversionData);
  }

  async update(
    id: number,
    conversionData: UpdateConversionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a conversion: ${id}`,
      `ConversionService`
    );
    return await this.conversionRepository.update(id, conversionData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a conversion: ${id}`,
      `ConversionService`
    );
    return await this.conversionRepository.delete(id);
  }
}
