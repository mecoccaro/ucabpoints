import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateRoleDTO } from '../models/dto/create-role.dto';
import { UpdateRoleDTO } from '../models/dto/update-role.dto';
import { Role } from '../models/role.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('RoleService');
  }

  async findOne(id: number): Promise<Role> {
    this.appLoggerService.log(`Return one role: ${id}`, `RoleService`);
    return await this.roleRepository.findOne(id);
  }

  async findAll(): Promise<Role[]> {
    this.appLoggerService.log(`Return all the roles`, `RoleService`);
    return await this.roleRepository.find();
  }

  async findOneByName(name: string): Promise<Role> {
    this.appLoggerService.log(
      `Return one role by name: ${name}`,
      `RoleService`
    );
    return await this.roleRepository.findOne({ name });
  }

  async create(roleData: CreateRoleDTO): Promise<Role> {
    this.appLoggerService.log(`Create a role: ${roleData.name}`, `RoleService`);
    return await this.roleRepository.save(roleData);
  }

  async update(id: number, roleData: UpdateRoleDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a role: ${id}`, `RoleService`);
    return await this.roleRepository.update(id, roleData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a role: ${id}`, `RoleService`);
    return await this.roleRepository.delete(id);
  }
}
