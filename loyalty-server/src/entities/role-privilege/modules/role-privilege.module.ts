import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePrivilegeController } from './role-privilege.controller';
import { RolePrivilegeService } from './role-privilege.service';
import { RolePrivilege } from '../models/role-privilege.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePrivilege]), AppLoggerModule],
  controllers: [RolePrivilegeController],
  providers: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
