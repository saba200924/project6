import { ChangeDetectorRef, Component } from '@angular/core';
import { Helper } from '../services/helper';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private help: Helper,
              private api : Api,
              private cdr: ChangeDetectorRef,
              private cartService: CartService,){
    
  }


  ngOnInit(){
    this.api.getAll(`products?Take=6&Page=1`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!

    })
  }




  productsarr:Product[]=[]

    selectedProduct!:Product
  showToast = false;
  toastMessage = '';



  quantity = 1;


// Add 'item: Product' and 'event: Event' as parameters
addToCart(item: Product, event: Event) {
  // 1. Prevent the card's routerLink from firing
  event.stopPropagation();
  event.preventDefault();

  // 2. Use the 'item' passed from the HTML, not 'this.selectedProduct'
  const qty = 1; // Default to 1 for home page quick-add
  this.cartService.addToCart(item, qty);

  console.log('Added:', item.name, 'Quantity:', qty);
  
  this.toastMessage = `✅ Added ${item.name} to cart!`;
  this.showToast = true;

  // Change 0 to 3000 so the user actually sees the message
  setTimeout(() => {
    this.showToast = false;
    this.cdr.detectChanges(); // Ensure the UI updates to hide toast
  }, 3000);
}

  
}
