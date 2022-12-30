import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'src/profile/profile.module';
import { RolesModule } from 'src/roles/roles.module';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.ACCESS_KEY || 'access',
      signOptions: {
        expiresIn: '30m'
      }
    }),
    TokenModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => RolesModule),
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }
