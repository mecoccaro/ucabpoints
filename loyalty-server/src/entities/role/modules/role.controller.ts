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

import { RoleService } from './role.service';
import { CreateRoleDTO } from '../models/dto/create-role.dto';
import { UpdateRoleDTO } from '../models/dto/update-role.dto';
import { Role } from '../models/role.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('role')
// @UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(
    private roleService: RoleService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('RoleController');
  }

  @Get()
  findAll(): Promise<Role[]> {
    this.appLoggerService.log('Return all the roles', 'RoleController');
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    this.appLoggerService.log('Return one role', 'RoleController');
    return this.roleService.findOne(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string): Promise<Role> {
    this.appLoggerService.log('Return one role by name', 'RoleController');
    return this.roleService.findOneByName(name);
  }

  @Post()
  async create(@Body() roleData: CreateRoleDTO): Promise<Role> {
    this.appLoggerService.log('Create a role', 'RoleController');
    return this.roleService.create(roleData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() roleData: UpdateRoleDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a role', 'RoleController');
    return this.roleService.update(Number(id), roleData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a role', 'RoleController');
    return this.roleService.delete(id);
  }
}
