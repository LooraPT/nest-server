import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from "./users/models/users.model";
import { Role } from "./roles/models/roles.model";
import { UserRoles } from "./roles/models/user-roles.model";


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
            models: [User, Role, UserRoles],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
    ],
})
export class AppModule { }