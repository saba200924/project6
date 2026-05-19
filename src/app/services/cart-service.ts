// import { Injectable } from '@angular/core';
// import { Api } from './api';
// import { BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {

//   constructor(private api: Api) {}

//   // ===== STATE (REACTIVE CART) =====
//   private cartSubject = new BehaviorSubject<any[]>([]);
//   cart$ = this.cartSubject.asObservable();

// refreshCart() {
//   this.api.getAll('cart').subscribe((res: any) => {
//     console.log('🛒 CART RESPONSE:', res);

//     this.cartSubject.next(res.data.items || []);
//   });
// }

//   // ===== ADD TO CART =====
//   addToCart(productId: number, quantity: number) {
//     const body = { productId, quantity };

//     return this.api.post('cart/add-to-cart', body).pipe(
//       tap(() => this.refreshCart())
//     );
//   }

//   // ===== EDIT QUANTITY =====
//   editQuantity(itemId: number, quantity: number) {
//     const body = { itemId, quantity };

//     return this.api.put('cart/edit-quantity', body).pipe(
//       tap(() => this.refreshCart())
//     );
//   }

//   // ===== REMOVE ITEM =====
//   removeItem(itemId: number) {
//     return this.api.delete(`cart/remove-from-cart/${itemId}`).pipe(
//       tap(() => this.refreshCart())
//     );
//   }

//   // ===== CHECKOUT =====
//   checkout() {
//     return this.api.post('cart/checkout', {}).pipe(
//       tap(() => this.refreshCart())
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { Api } from './api';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private api: Api) {}

  // ===== STATE =====
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  // ===== LOAD CART =====
  refreshCart() {
    this.api.getAll('cart').subscribe((res: any) => {
      console.log('🛒 CART RESPONSE:', res);

      this.cartSubject.next(res.data.items || []);
    });
  }

  // ===== ADD =====
  addToCart(productId: number, quantity: number) {
    const body = { productId, quantity };

    return this.api.post('cart/add-to-cart', body).pipe(
      tap(() => {
        // optimistic refresh (fast UI)
        this.refreshCart();
      })
    );
  }

  // ===== UPDATE QTY =====
  editQuantity(itemId: number, quantity: number) {
    const body = { itemId, quantity };

    return this.api.put('cart/edit-quantity', body).pipe(
      tap(() => {
        this.refreshCart();
      })
    );
  }

  // ===== REMOVE =====
  removeItem(itemId: number) {
    return this.api.delete(`cart/remove-from-cart/${itemId}`).pipe(
      tap(() => {
        this.refreshCart();
      })
    );
  }

  // ===== CHECKOUT =====
  checkout() {
    return this.api.post('cart/checkout', {}).pipe(
      tap(() => {
        this.refreshCart();
      })
    );
  }
}
