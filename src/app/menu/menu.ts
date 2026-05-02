import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Category, Product } from '../models/product';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private api:Api,
              private cdr:ChangeDetectorRef,
              private cartService: CartService){}



    ngOnInit(){
    this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
    })

      this.api.getAll(`categories`).subscribe((resp:any)=>{
      console.log(resp.data)
      this.categoriesarr=resp.data
      this.cdr.detectChanges()
    })

  }


  filterByCategory(categoryId: number) {
     this.selectedCategoryId = categoryId;
  this.api.getAll(`products/filter?CategoryId=${categoryId}&Take=100&Page=1`)
    .subscribe((resp: any) => {
      console.log('Filtered:', resp.data.products)
      this.productsarr = resp.data.products
      this.cdr.detectChanges()
    });
}

all(){
  this.selectedCategoryId = null;
      this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
    })
}
    

selectedCategoryId: number | null = null;

  categoriesarr:Category[]=[]
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
