import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoyaltyUser } from '../../entities/loyalty-user/models/loyalty-user.entity';
import { LoyaltyUserService } from '../../entities/loyalty-user/modules/loyalty-user.service';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { UserStatusService } from 'src/entities/user-status/modules/user-status.service';
import { StatusService } from 'src/entities/status/modules/status.service';
import { Status } from 'src/entities/status/models/status.entity';
import { RoleService } from '../../entities/role/modules/role.service';
import { Role } from '../../entities/role/models/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly loyaltyUserServivice: LoyaltyUserService,
    private readonly userStatusService: UserStatusService,
    private readonly statusService: StatusService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('AuthService');
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<LoyaltyUser>> {
    this.appLoggerService.log(`Validate an user ${email}`, 'AuthService');
    const user = await this.loyaltyUserServivice.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    } else if (pass && pass !== '' && user.password !== pass) {
      throw new UnauthorizedException('Wrong Password');
    }

    const userStatus = await this.userStatusService.findOneByUser(user.id);

    let status: Status;
    if (typeof userStatus.status === 'number') {
      status = await this.statusService.findOne(userStatus.status);
    } else {
      status = await this.statusService.findOne(userStatus.status.id);
    }

    if (status.name !== 'ACTIVE') {
      throw new UnauthorizedException('User locked');
    }

    const { password: excludedProp, ...result } = user;

    return result;
  }

  async login(user: Partial<LoyaltyUser>) {
    this.appLoggerService.log(`Login ${user.email}`, 'AuthService');

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateAdmin(
    email: string,
    pass: string
  ): Promise<Partial<LoyaltyUser>> {
    this.appLoggerService.log('Validate an admin', 'AuthService');
    const user = await this.loyaltyUserServivice.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    } else if (pass && pass !== '' && user.password !== pass) {
      throw new UnauthorizedException('Wrong Password');
    }

    const userStatus = await this.userStatusService.findOneByUser(user.id);

    let status: Status;
    if (typeof userStatus.status === 'number') {
      status = await this.statusService.findOne(userStatus.status);
    } else {
      status = await this.statusService.findOne(userStatus.status.id);
    }

    if (status.name !== 'ACTIVE') {
      throw new UnauthorizedException('User locked');
    }

    let userRole;
    if (typeof user.role === 'number') {
      userRole = await this.roleService.findOne(user.role);
    } else {
      userRole = await this.roleService.findOne(user.role.id);
    }

    if (userRole.name !== 'ADMINISTRATOR') {
      throw (new UnauthorizedException('Not admin'),
      this.appLoggerService.log('Is not an administrator', 'adminlogin'));
    }

    const { password: excludedProp, ...result } = user;

    return result;
  }

  async adminLogin(user: Partial<LoyaltyUser>) {
    this.appLoggerService.log('adminLogin', 'AuthService');

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
