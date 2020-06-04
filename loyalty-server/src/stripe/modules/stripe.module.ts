import { Module, forwardRef } from '@nestjs/common';
import Stripe from 'stripe';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { AppLoggerModule } from '../../logger/app-logger.module';
import { ConfigModule } from '../../config/modules/config.module';
import configService, {
  ConfigService,
} from '../../config/modules/config.service';
import { CommissionModule } from 'src/entities/commission/modules/commission.module';

@Module({
  imports: [AppLoggerModule, ConfigModule, CommissionModule],
  controllers: [StripeController],
  providers: [
    {
      provide: 'Stripe',
      useFactory: async () => {
        return new Stripe(configService.get('STRIPE_API_SECRET_KEY'), {
          apiVersion: configService.get('STRIPE_API_VERSION'),
        });
      },
    },
    StripeService,
  ],
  exports: [StripeService],
})
export class StripeModule {}
