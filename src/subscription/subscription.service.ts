import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { LevelService } from 'src/level/level.service';
import { Level } from 'src/level/models/level.model';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './models/subscription.model';

@Injectable()
export class SubscriptionService {

    constructor(@InjectModel(Subscription) private subscriptionRepository: typeof Subscription,
        private filesService: FilesService,
        private levelService: LevelService) { }

    async createSub(dto: CreateSubscriptionDto, img: Express.Multer.File): Promise<Subscription> {
        const fileName = await this.filesService.createProfileImg(img);
        const subscription = await this.subscriptionRepository.create({ ...dto, img: fileName })
        return subscription;
    }

    async getAll(): Promise<Subscription[]> {
        const allSubscription = await this.subscriptionRepository.findAll();
        return allSubscription;
    }

    async deleteSubscription(id: number): Promise<void> {
        const sub = await this.subscriptionRepository.findOne({ where: { id }, include: [{ model: Level, as: 'levels' }] })
        if (!sub) {
            throw new HttpException('subscription not found', HttpStatus.BAD_REQUEST)
        }
        if (sub.levels.length) {
            await this.levelService.deleteAllLevelsForSubscription(sub.id);
        }
        await this.filesService.deleteProfileImg(sub.img)
        await sub.destroy()
    }

    async getOne(id: number): Promise<Subscription> {
        const subscription = await this.subscriptionRepository.findOne({ where: { id }, include: [{ model: Level, as: 'levels' }] })
        if (!subscription) {
            throw new HttpException('sub not found', HttpStatus.BAD_REQUEST)
        }
        return subscription
    }
}
