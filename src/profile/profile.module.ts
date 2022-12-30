import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/models/users.model';
import { Profile } from './models/profile.model';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule { }
