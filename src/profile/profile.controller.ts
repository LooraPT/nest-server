import { Body, Controller, Get, Param, Patch, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/models/users.model';
import { UserAuth } from 'src/users/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) { }

    @ApiOperation({ summary: 'update user profile' })
    @ApiResponse({ status: 200, type: Profile })
    @UseGuards(AuthGuard)
    @Put('/:id')
    updateProfile(@Param('id') userId: number, @Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile(userId, dto);
    }

    @ApiOperation({ summary: 'load img profile' })
    @ApiResponse({ status: 200, type: Profile })
    @UseGuards(AuthGuard)
    @Patch('/:id')
    @UseInterceptors(FileInterceptor('img'))
    loadImgProfile(@Param('id') userId: number, @UploadedFile() img: Express.Multer.File) {
        return this.profileService.uploadImgProfile(userId, img)
    }

    @ApiOperation({ summary: 'get user profile' })
    @ApiResponse({ status: 200, type: Profile })
    @UseGuards(AuthGuard)
    @Get()
    getProfileById(@UserAuth() user: User) {
        return this.profileService.getProfileById(user.id);
    }

}
