import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { AppLoggerService } from '../../logger/app-logger.service';
import { CreateEmailDto } from '../models/dto/create-email.dto';
import { UpgradeEmailDto } from '../models/dto/upgrade-email.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { ReceiveEmailDto } from '../models/dto/receive-email.dto';
import { StatusEmailDto } from '../models/dto/status-email.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoyaltyUserService } from '../../entities/loyalty-user/modules/loyalty-user.service';

@Controller('email')
export class EmailController {
  constructor(
    private emailService: EmailService,
    private loyaltyUserService: LoyaltyUserService,
    private appLoggerService: AppLoggerService
  ) {
    appLoggerService.setContext('EmailController');
  }

  @Post('welcome')
  async create(@Body() emailData: CreateEmailDto): Promise<void> {
    this.appLoggerService.log('Welcome email', 'Sending welcome email');
    return this.emailService.create(emailData);
  }

  @Post('upgrade')
  async upgrade(@Body() emailData: UpgradeEmailDto): Promise<void> {
    this.appLoggerService.log('Upgrade email', 'Sending upgrade email');
    return this.emailService.upgrade(emailData);
  }

  @Post('receive/:id')
  @UseInterceptors(FileInterceptor('file'))
  async receive(@Param('id') id: number, @UploadedFile() file): Promise<void> {
    this.appLoggerService.log('Receive email', 'Sending receive email');
    const userEmail = await this.loyaltyUserService.findOne(id);
    return await this.emailService.receive(userEmail.email, file);
  }

  @Post('status')
  async status(@Body() emailData: StatusEmailDto): Promise<void> {
    this.appLoggerService.log('Status email', 'Sending status email');
    return this.emailService.status(emailData);
  }

  @Post('recover/:email')
  async recover(@Param('email') email: string): Promise<void> {
    this.appLoggerService.log(
      'Recover password email',
      'Sending recover email'
    );
    const userData = await this.loyaltyUserService.findUserByEmail(email);
    return this.emailService.recover(userData.email, userData.id);
  }
}
