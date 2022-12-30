import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from 'src/subscription/models/subscription.model';
import { CreateLevelDto } from './dto/create-level.dto';
import { Level } from './models/level.model';

@Injectable()
export class LevelService {

    constructor(@InjectModel(Level) private levelRepository: typeof Level,
        @InjectModel(Subscription) private subscriptionRepository: typeof Subscription) { }

    async createLevelsForSubscription(dto: CreateLevelDto): Promise<Level> {
        const sub = await this.subscriptionRepository.findOne({ where: { id: dto.subscriptionId }, include: [{ model: Level, as: 'levels' }] })
        if (sub.levels.length > 2) {
            throw new HttpException('This subscription already has more than three levels', HttpStatus.BAD_REQUEST)
        }

        if (sub) {
            const newLevel = await this.levelRepository.create({ ...dto });
            return newLevel;
        }
        throw new HttpException('sub not found', HttpStatus.BAD_REQUEST)
    }

    async deleteAllLevelsForSubscription(subscriptionId: number): Promise<void> {
        const allLevelForSub = await this.levelRepository.findAll({ where: { subscriptionId } })
        for (let i = 0; i < allLevelForSub.length; i++) {
            const level = allLevelForSub[i];
            await level.destroy();
        }
    }

}
