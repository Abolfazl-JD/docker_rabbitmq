import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ){}

  async createOrder(orderDetails: CreateOrderDto){
    const newOrder = await this.ordersRepository.create(orderDetails)
    await lastValueFrom(this.billingClient.emit('order-created', newOrder))
  }

  findOrders(){
    return this.ordersRepository.find({})
  }
}
