// import { ChangeDetectorRef, Component } from '@angular/core';
// import { Helper } from '../services/helper';
// import { Api } from '../services/api';
// import { Product } from '../models/product';
// import { Router, RouterModule } from '@angular/router';
// import { CartService } from '../services/cart-service';

// @Component({
//   selector: 'app-home',
//   imports: [RouterModule],
//   templateUrl: './home.html',
//   styleUrl: './home.scss',
// })
// export class Home {
//   constructor(private help: Helper,
//               private api : Api,
//               private cdr: ChangeDetectorRef,
//               private cartService: CartService,
//               private router:Router ){
    
//   }


//   ngOnInit(){
//     this.api.getAll(`products?Take=6&Page=1`).subscribe((resp:any)=>{
//       console.log(resp.data.products)
//       this.productsarr=resp.data.products
//       this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!

//     })
//   }




//   productsarr:Product[]=[]

//     selectedProduct!:Product
//   showToast = false;
//   toastMessage = '';



//   quantity = 1;


// addToCart(item: Product, event: Event) {

//   event.stopPropagation();
//   event.preventDefault();

//   this.cartService.addToCart(item.id, 1).subscribe({
//     next: () => {
//       console.log('Added:', item.name, 'Quantity:', 1);
      
//       this.toastMessage = `✅ Added ${item.name} to cart!`;
//       this.showToast = true;

//       setTimeout(() => {
//         this.showToast = false;
//         this.cdr.detectChanges();
//       }, 3000);
//     },
//     error: (err) => {
//       console.error('Failed to add item to cart', err);
//     }
//   });
// }

// get isLoggedIn(): boolean {
//   return !!localStorage.getItem('token');
// }

// showLoginAlert(event: Event) {
//   event.preventDefault();
//   event.stopPropagation();

//   alert('Please sign in first');
//   this.router.navigate(['/login']);
// }

  
// }



import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router
  ) {}

  productsarr: Product[] = [];

  showToast = false;
  toastMessage = '';

  ngOnInit() {
    this.api.getAll(`products?Take=6&Page=1`).subscribe((resp: any) => {
      this.productsarr = resp.data.products;
      this.cdr.detectChanges();
    });
  }

  // FIXED NAVIGATION (NO routerLink CONFLICT)
  goToDetails(id: number) {
    this.router.navigate(['/details'], {
      queryParams: { id }
    });
  }

  // addToCart(item: Product, event: Event) {
  //   event.stopPropagation();

  //   this.cartService.addToCart(item.id, 1).subscribe({
  //     next: () => {

  //       this.toastMessage = `Added ${item.name} to cart!`;
  //       this.showToast = true;

  //       setTimeout(() => {
  //         this.showToast = false;
  //         this.cdr.detectChanges();
  //       }, 2000);

  //     },
  //     error: (err) => {
  //       console.error('Failed to add item to cart', err);
  //     }
  //   });
  // }


//   addToCart(item: Product, event: Event) {

//   console.log('🔥 CLICKED ADD TO CART');

//   event.stopPropagation();

//   this.cartService.addToCart(item.id, 1).subscribe({
//     next: (res) => {
//       console.log('✅ API SUCCESS:', res);
//     },
//     error: (err) => {
//       console.log('❌ API ERROR:', err);
//     }
//   });
// }

addToCart(item: Product, event: Event) {

  event.stopPropagation();

  this.cartService.addToCart(item.id, 1).subscribe({
    next: () => {

      // 👇 IMPORTANT: reset first
      this.showToast = false;
      this.cdr.detectChanges();

      // 👇 force next tick update
      setTimeout(() => {
        this.toastMessage = `Added ${item.name}`;
        this.showToast = true;
        this.cdr.detectChanges();
      });

      setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges();
      }, 2000);

    }
  });
}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  showLoginAlert(event: Event) {
    event.stopPropagation();
    alert('Please sign in first');
    this.router.navigate(['/login']);
  }
}