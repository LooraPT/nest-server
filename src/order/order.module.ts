import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from 'src/subscription/models/subscription.model';
import { UserSubscription } from 'src/subscription/models/user-subscriptions.model';
import { User } from 'src/users/models/users.model';
import { UsersModule } from 'src/users/users.module';
import { Order } from './models/order.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    SequelizeModule.forFeature([User, Subscription, Order, UserSubscription]),
    UsersModule
  ]
})
export class OrderModule { }
