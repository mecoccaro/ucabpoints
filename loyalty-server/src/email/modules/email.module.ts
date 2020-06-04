import { Module } from '@nestjs/common';
//import { SendGridModule} from "@anchan828/nest-sendgrid";
import {EmailController} from "./email.controller";
import {EmailService} from "./email.service";
import {AppLoggerModule} from "../../logger/app-logger.module";
import {MailService} from '@sendgrid/mail';
import {ConfigModule} from "../../config/modules/config.module";
import {LoyaltyUserService} from "../../entities/loyalty-user/modules/loyalty-user.service";
import {LoyaltyUserModule} from "../../entities/loyalty-user/modules/loyalty-user.module";


@Module({
   imports: [AppLoggerModule, ConfigModule, LoyaltyUserModule],
    controllers: [EmailController],
    providers: [EmailService, MailService],
    })


export class EmailModule {}