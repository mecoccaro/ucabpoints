import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateLoyaltyUserDTO } from '../models/dto/create-loyalty-user.dto';
import { UpdateLoyaltyUserDTO } from '../models/dto/update-loyalty-user.dto';
import { LoyaltyUser } from '../models/loyalty-user.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class LoyaltyUserService {
  constructor(
    @InjectRepository(LoyaltyUser)
    private loyaltyUserRepository: Repository<LoyaltyUser>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('LoyaltyUserService');
  }

  async findUserByEmail(email: string): Promise<LoyaltyUser> {
    this.appLoggerService.log(
      `Return the loyalty-user by email`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.findOne({
      relations: ['role'],
      where: { email: email },
    });
  }

  async findOne(id: number): Promise<LoyaltyUser> {
    this.appLoggerService.log(
      `Return one loyalty-user: ${id}`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.findOne(id);
  }

  async findAll(): Promise<LoyaltyUser[]> {
    this.appLoggerService.log(
      `Return all the loyalty-users`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.find();
  }

  async create(loyaltyUserData: CreateLoyaltyUserDTO): Promise<LoyaltyUser> {
    this.appLoggerService.log(
      `Create a loyalty-user: ${loyaltyUserData.email}`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.save(loyaltyUserData);
  }

  async update(
    id: number,
    loyaltyUserData: UpdateLoyaltyUserDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a loyalty-user: ${id}`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.update(id, loyaltyUserData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a loyalty-user: ${id}`,
      `LoyaltyUserService`
    );
    return await this.loyaltyUserRepository.delete(id);
  }
}
