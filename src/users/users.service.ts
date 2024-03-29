import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/models/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { Subscription } from 'src/subscription/models/subscription.model';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private usersRepository: typeof User,
        private rolesService: RolesService) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(dto, { include: [{ model: Role, as: 'roles' }] })
        const role = await this.rolesService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;

    }

    async getUserByEmail(email: string): Promise<User> {
        const findUser = await this.usersRepository.findOne({ where: { email }, include: [{ model: Role, as: 'roles' }] })
        return findUser;
    }

    async getSubscriptionsUser(id: number): Promise<Subscription[]> {
        const findUser = await this.usersRepository.findOne({ where: { id }, include: [{ model: Subscription, as: 'subscriptions' }] })
        if (findUser.subscriptions.length) {
            return findUser.subscriptions;
        }
        return null
    }

    async removeSubscription(userId: number, subscriptionId: number): Promise<Subscription[]> {
        const findUser = await this.usersRepository.findOne({ where: { id: userId }, include: [{ model: Subscription, as: 'subscriptions' }] })
        for (let i = 0; i < findUser.subscriptions.length; i++) {
            if (findUser.subscriptions[i].id == subscriptionId) {
                await findUser.$remove('subscription', subscriptionId)
            }
        }
        return findUser.subscriptions.filter(sub => sub.id !== subscriptionId)
    }
}
