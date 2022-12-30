import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { Subscription } from 'src/subscription/models/subscription.model';
import { UserSubscription } from 'src/subscription/models/user-subscriptions.model';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { Level } from './models/level.model';

@Module({
  controllers: [LevelController],
  providers: [LevelService],
  imports: [
    SequelizeModule.forFeature([Level, Subscription, UserSubscription]),
    RolesModule,
    AuthModule,
  ],
  exports: [
    LevelService
  ]
})
export class LevelModule { }
