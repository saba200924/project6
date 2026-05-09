import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Category, Product } from '../models/product';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [RouterModule,FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private api:Api,
              private cdr:ChangeDetectorRef,
              private cartService: CartService){}



    ngOnInit(){
    this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
  this.productsarr = resp.data.products;
  this.allProducts = resp.data.products; // 👈 keep backup
  this.cdr.detectChanges();    // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
});

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


addToCart(item: Product, event: Event) {
  event.stopPropagation();
  event.preventDefault();

  const qty = 1;
  this.cartService.addToCart(item, qty);

  console.log('Added:', item.name, 'Quantity:', qty);
  
  this.toastMessage = `✅ Added ${item.name} to cart!`;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
    this.cdr.detectChanges();
  }, 3000);
}

selectedRate: number = 0;
allProducts: Product[] = [];



filterByRate() {
  this.productsarr = this.allProducts.filter(p =>
    p.rate >= this.selectedRate
  );

  this.cdr.detectChanges();
}

selectedSpicy: number = 0;


filterBySpicy() {
  this.productsarr = this.allProducts.filter(p =>
    p.spiciness >= this.selectedSpicy
  );

  this.cdr.detectChanges();
}



selectedPrice: number = 100;
filterByPrice() {
  this.productsarr = this.allProducts.filter(p =>
    p.price <= this.selectedPrice
  );

  this.cdr.detectChanges();
}


vegetarian: boolean = false;

toggleVegetarian() {
  this.vegetarian = !this.vegetarian;

  this.productsarr = this.allProducts.filter(p => {
    return this.vegetarian ? p.vegetarian === true : true;
  });

  this.cdr.detectChanges();
}

searchText: string = '';


filterBySearch() {
  let text = this.searchText.toLowerCase().trim();

  this.productsarr = this.allProducts.filter(p => {
    return (
      p.name.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text)
    );
  });

  this.cdr.detectChanges();
}



resetAll(){
  this.vegetarian = false;
  this.selectedCategoryId = null;
  this.selectedRate = 0;
  this.selectedSpicy = 0;
  this.selectedPrice = 100;
  this.productsarr = this.allProducts;
  this.searchText = '';
  this.cdr.detectChanges();
}




















}

