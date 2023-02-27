import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env'
    }),
    RmqModule
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
