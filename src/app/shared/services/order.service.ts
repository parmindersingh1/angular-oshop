import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  getOrders() {
    return this.db.list('/orders');
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

}
