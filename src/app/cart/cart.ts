import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnDestroy {

  cartItems: any[] = [];
  private sub!: Subscription;

  constructor(private cartService: CartService,
              private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.sub = this.cartService.cart$.subscribe(items => {
      this.cartItems = items || [];
      this.cdr.detectChanges();
    });

    this.cartService.refreshCart();
  }
  
  increase(item: any) {
    this.cartService.editQuantity(item.id, item.quantity + 1).subscribe({
      next: () => this.cartService.refreshCart()
    });
  }

  decrease(item: any) {
    if (item.quantity <= 1) return;

    this.cartService.editQuantity(item.id, item.quantity - 1).subscribe({
      next: () => this.cartService.refreshCart()
    });
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId).subscribe({
      next: () => this.cartService.refreshCart()
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: () => {
        alert('Order placed successfully');
        this.cartService.refreshCart();
      }
    });
  }


  getSubtotal() {
    return this.cartItems
      .reduce((sum, item) =>
        sum + (item.product?.price || 0) * (item.quantity || 0),
      0)
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}