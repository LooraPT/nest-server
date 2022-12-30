import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profilesRepository: typeof Profile,
        private filesService: FilesService) { }

    async createProfile(userId: number): Promise<Profile> {
        const profile = await this.profilesRepository.create({ userId })
        return profile
    }

    async updateProfile(userId: number, dto: UpdateProfileDto): Promise<Profile> {
        const userProfile = await this.profilesRepository.findOne({ where: { userId } })
        if (!userProfile) {
            throw new HttpException('I can not found your profile', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        userProfile.phone = dto.phone;
        userProfile.username = dto.username;
        userProfile.fullName = dto.fullName;
        await userProfile.save();
        return userProfile;
    }

    async uploadImgProfile(userId: number, img: Express.Multer.File): Promise<Profile> {
        const userProfile = await this.profilesRepository.findOne({ where: { userId } })
        if (!userProfile) {
            throw new HttpException('I can not found your profile', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        if (userProfile.img) {
            await this.filesService.deleteProfileImg(userProfile.img);
        }
        const fileName = await this.filesService.createProfileImg(img);
        userProfile.img = fileName;
        userProfile.save();
        return userProfile;
    }

    async getProfileById(userId: number): Promise<Profile> {
        const profile = await this.profilesRepository.findOne({ where: { userId } });
        if (profile) {
            return profile;
        }
        throw new HttpException('I can not found your profile', HttpStatus.INTERNAL_SERVER_ERROR)

    }
}
