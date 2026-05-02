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
}
