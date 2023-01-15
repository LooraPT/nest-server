import { Controller, Get } from '@nestjs/common';
import { Param, Post, Query } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';
import { UsersService } from './users.service';
import { Subscription } from 'src/subscription/models/subscription.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'get user and your subscriptions' })
    @ApiResponse({ status: 200, type: User })
    @Get('/:id')
    getAllSubscriptionUser(@Param('id') id: number) {
        return this.usersService.getSubscriptionsUser(id);
    }

    @ApiOperation({ summary: 'remove subscription' })
    @ApiResponse({ status: 200, type: Subscription })
    @Post('/remove')
    removeUserSubscription(@Query('userId') userId: number, @Query('subscriptionId') subscriptionId: number) {
        return this.usersService.removeSubscription(userId, subscriptionId);
    }
}
