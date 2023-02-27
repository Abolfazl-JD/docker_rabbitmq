import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() orderDetails: CreateOrderDto){
    return this.ordersService.createOrder(orderDetails)
  }

  @Get()
  getOrders(){
    return this.ordersService.findOrders()
  }
}
