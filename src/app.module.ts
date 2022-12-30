import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from "./users/models/users.model";
import { Role } from "./roles/models/roles.model";
import { UserRoles } from "./roles/models/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { Token } from "./token/models/token.model";
import { ProfileModule } from './profile/profile.module';
import { Profile } from "./profile/models/profile.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { SubscriptionModule } from './subscription/subscription.module';
import * as path from 'path';
import { Subscription } from "./subscription/models/subscription.model";
import { UserSubscription } from "./subscription/models/user-subscriptions.model";
import { LevelModule } from './level/level.module';
import { Level } from "./level/models/level.model";
import { OrderModule } from './order/order.module';
import { Order } from "./order/models/order.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Token, Profile, Subscription, UserSubscription, Level, Order],
            autoLoadModels: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TokenModule,
        ProfileModule,
        FilesModule,
        SubscriptionModule,
        LevelModule,
        OrderModule,
    ],
})
export class AppModule { }