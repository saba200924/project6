import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   private cart: any[] = [];

  constructor() {
    let saved = localStorage.getItem('cart');
    this.cart = saved ? JSON.parse(saved) : [];
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any, quantity: number) {
    let existing = this.cart.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.save();
  }

  increase(id: number) {
    let item = this.cart.find(p => p.id === id);
    if (item) item.quantity++;
    this.save();
  }

  decrease(id: number) {
    let item = this.cart.find(p => p.id === id);
    if (item && item.quantity > 1) item.quantity--;
    this.save();
  }

  remove(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
