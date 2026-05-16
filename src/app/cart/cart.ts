import { Component } from '@angular/core';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCart();
  }

  increase(id: number) {
    this.cartService.increase(id);
  }

  decrease(id: number) {
    this.cartService.decrease(id);
  }

  remove(id: number) {
    this.cartService.remove(id);
    this.cartItems = this.cartService.getCart();
  }

  getSubtotal() {
  return this.cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
}

getTax() {
  return (Number(this.getSubtotal()) * 0.10).toFixed(2);
}

getTotal() {
  return (
    Number(this.getSubtotal()) +
    Number(this.getTax())
  ).toFixed(2);
}
}
