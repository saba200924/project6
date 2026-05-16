import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  constructor(private route:ActivatedRoute,
              private api : Api,
              private cdr: ChangeDetectorRef,
              private cartService: CartService){
    this.route.queryParams.subscribe((data:any)=>{
      console.log(data.id);
      this.selectedid=data.id
    })
  }


  ngOnInit() {
  if (!this.selectedid) return;

  this.api.getAll(`products/${this.selectedid}`).subscribe({
    next: (resp: any) => {
      console.log(resp.data);
      this.selectedProduct = resp.data;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log('Error loading product', err);
    }
  });
}




  selectedid = 0

  productsarr : Product[]=[]
  selectedProduct: Product | null = null;

  showToast = false;
  toastMessage = '';



  quantity = 1;

increase() {
  this.quantity++;
}

decrease() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

addToCart() {
  this.cartService.addToCart(this.selectedProduct, this.quantity);
  console.log('Added:', this.selectedProduct, 'Quantity:', this.quantity);
    this.toastMessage = `✅ Added ${this.quantity} item${this.quantity > 1 ? 's' : ''} successfully`;

  this.showToast = true;

  setTimeout(() => {
  this.showToast = false;
  this.cdr.detectChanges();
}, 3000);
}

}
