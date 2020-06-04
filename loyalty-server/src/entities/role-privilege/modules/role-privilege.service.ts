import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateRolePrivilegeDTO } from '../models/dto/create-role-privilege.dto';
import { UpdateRolePrivilegeDTO } from '../models/dto/update-role-privilege.dto';
import { RolePrivilege } from '../models/role-privilege.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class RolePrivilegeService {
  constructor(
    @InjectRepository(RolePrivilege)
    private rolePrivilegeRepository: Repository<RolePrivilege>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('RolePrivilegeController');
  }

  async findOne(id: number): Promise<RolePrivilege> {
    this.appLoggerService.log(
      `Return one role-privilege: ${id}`,
      `RolePrivilegeController`
    );
    return await this.rolePrivilegeRepository.findOne(id, {
      relations: ['role', 'privilege'],
    });
  }

  async findAll(): Promise<RolePrivilege[]> {
    this.appLoggerService.log(
      'Return all the role-privileges',
      'RolePrivilegeController'
    );
    return await this.rolePrivilegeRepository.find({
      relations: ['role', 'privilege'],
    });
  }

  async create(
    rolePrivilegeData: CreateRolePrivilegeDTO
  ): Promise<RolePrivilege> {
    this.appLoggerService.log(
      `Create a role-privilege`,
      `RolePrivilegeController`
    );
    return await this.rolePrivilegeRepository.save(rolePrivilegeData);
  }

  async update(
    id: number,
    rolePrivilegeData: UpdateRolePrivilegeDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a role-privilege: ${id}`,
      `RolePrivilegeController`
    );
    return await this.rolePrivilegeRepository.update(id, rolePrivilegeData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a role-privilege: ${id}`,
      `RolePrivilegeController`
    );
    return await this.rolePrivilegeRepository.delete(id);
  }
}
