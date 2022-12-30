import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'get user and your subscriptions' })
    @ApiResponse({ status: 200, type: User })
    @Get('/:id')
    getAllSubscriptionUser(@Param() id: number) {
        return this.usersService.getSubscriptionsUser(id);
    }
}
