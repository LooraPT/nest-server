import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Token } from './models/token.model';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({
      secret: process.env.REFRESH_KEY || 'refresh',
      signOptions: {
        expiresIn: '30d'
      }
    }),
    SequelizeModule.forFeature([Token, User]),
  ],
  exports: [
    TokenService
  ]
})
export class TokenModule { }
