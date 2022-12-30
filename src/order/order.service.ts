import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from 'src/subscription/models/subscription.model';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(Subscription) private subscriptionRepository: typeof Subscription,
        private usersService: UsersService) { }

    async createNewOrder(dto: CreateOrderDto): Promise<Order> {
        const mbOrder = await this.orderRepository.findOne({ where: { subscriptionId: dto.subscriptionId, userId: dto.userId } })
        const user = await this.usersService.getUserByEmail(dto.email)
        const subscription = await this.subscriptionRepository.findOne({ where: { id: dto.subscriptionId } })
        if (!user || !subscription) {
            throw new HttpException('i can not found user or subscription', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        if (mbOrder) {
            throw new HttpException('You already have this subscription', HttpStatus.BAD_REQUEST)
        }
        user.$add('subscription', dto.subscriptionId)
        const order = await this.orderRepository.create({ ...dto });
        return order;
    }


}
