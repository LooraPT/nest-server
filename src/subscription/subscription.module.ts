import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { LevelModule } from 'src/level/level.module';
import { Level } from 'src/level/models/level.model';
import { Order } from 'src/order/models/order.model';
import { User } from 'src/users/models/users.model';
import { Subscription } from './models/subscription.model';
import { UserSubscription } from './models/user-subscriptions.model';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [
    SequelizeModule.forFeature([User, Subscription, UserSubscription, Level, Order]),
    LevelModule,
    AuthModule,
    FilesModule,
  ],
  exports: [
    SubscriptionService
  ]
})
export class SubscriptionModule { }
