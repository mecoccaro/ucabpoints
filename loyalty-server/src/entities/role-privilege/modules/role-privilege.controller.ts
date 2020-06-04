import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { RolePrivilegeService } from './role-privilege.service';
import { CreateRolePrivilegeDTO } from '../models/dto/create-role-privilege.dto';
import { UpdateRolePrivilegeDTO } from '../models/dto/update-role-privilege.dto';
import { RolePrivilege } from '../models/role-privilege.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('role-privilege')
@UseGuards(AuthGuard('jwt'))
export class RolePrivilegeController {
  constructor(
    private rolePrivilegeService: RolePrivilegeService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('RolePrivilegeController');
  }

  @Get()
  findAll(): Promise<RolePrivilege[]> {
    this.appLoggerService.log(
      'Return all the role-privileges',
      'RolePrivilegeController'
    );
    return this.rolePrivilegeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<RolePrivilege> {
    this.appLoggerService.log(
      'Return one role-privilege',
      'RolePrivilegeController'
    );
    return this.rolePrivilegeService.findOne(id);
  }

  @Post()
  async create(
    @Body() rolePrivilegeData: CreateRolePrivilegeDTO
  ): Promise<RolePrivilege> {
    this.appLoggerService.log(
      'Create a role-privilege',
      'RolePrivilegeController'
    );
    return this.rolePrivilegeService.create(rolePrivilegeData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() rolePrivilegeData: UpdateRolePrivilegeDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      'Update a role-privilege',
      'RolePrivilegeController'
    );
    return this.rolePrivilegeService.update(Number(id), rolePrivilegeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      'Delete a role-privilege',
      'RolePrivilegeController'
    );
    return this.rolePrivilegeService.delete(id);
  }
}
