import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @ApiOperation({ summary: 'create order' })
    @ApiResponse({ status: 200, type: Order })
    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.createNewOrder(dto);
    }

}
