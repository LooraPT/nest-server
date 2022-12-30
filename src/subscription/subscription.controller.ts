import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/check-role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './models/subscription.model';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {

    constructor(private subscriptionService: SubscriptionService) { }

    @ApiOperation({ summary: 'create sub' })
    @ApiResponse({ status: 200, type: Subscription })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/new')
    @UseInterceptors(FileInterceptor('img'))
    createSub(@Body() dto: CreateSubscriptionDto, @UploadedFile() img: Express.Multer.File) {
        return this.subscriptionService.createSub(dto, img);
    }

    @ApiOperation({ summary: 'get all subs' })
    @ApiResponse({ status: 200, type: [Subscription] })
    @Get()
    getAllSubs() {
        return this.subscriptionService.getAll()
    }

    @ApiOperation({ summary: 'get one sub' })
    @ApiResponse({ status: 200, type: Subscription })
    @Get('/:id')
    getOneSub(@Param('id') id: number) {
        return this.subscriptionService.getOne(id);
    }

    @ApiOperation({ summary: 'create sub' })
    @ApiResponse({ status: 200, type: Subscription })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteSub(@Param('id') id: number) {
        return this.subscriptionService.deleteSubscription(id)
    }
}
