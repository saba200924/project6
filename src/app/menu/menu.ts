// import { ChangeDetectorRef, Component } from '@angular/core';
// import { Api } from '../services/api';
// import { Category, Product } from '../models/product';
// import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
// import { CartService } from '../services/cart-service';
// import { FormsModule } from '@angular/forms';
// import { Token } from '@angular/compiler';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-menu',
//   imports: [CommonModule, FormsModule, RouterLinkWithHref],
//   templateUrl: './menu.html',
//   styleUrl: './menu.scss',
// })
// export class Menu {
//     constructor(private api: Api,
//        private cdr : ChangeDetectorRef,
//         private cartService: CartService,
//          private router: Router) {}

//            isFiltered: boolean = false;
//   categoryId: number | null = null;
//   data: { products: Product[] } = { products: [] };
//   category: { category: Category[] } = { category: [] };
//   page = 1;
//   take = 100;
//   hasMore = false;
//   loading = false;

// vegeterian: boolean = false;
// spiciness: number = 0
// rate = 0;
// minPrice = 0;
// maxPrice = 100

// search = ""


//     ngOnInit(){
//     this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
//   this.productsarr = resp.data.products;
//   this.allProducts = resp.data.products;
//   this.cdr.detectChanges();    // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
// });

//       this.api.getAll(`categories`).subscribe((resp:any)=>{
//       console.log(resp.data)
//       this.categoriesarr=resp.data
//       this.cdr.detectChanges()
//     })

//   }

//  categoriesarr: Category[] = [];
//   productsarr:Product[]=[]


//   showToast = false;
//   toastMessage = '';





// addToCart(item: Product, event: Event) {
//   event.stopPropagation();
//   event.preventDefault();

//   const qty = 1;
//   this.cartService.addToCart(item, qty);

//   console.log('Added:', item.name, 'Quantity:', qty);
  
//   this.toastMessage = `✅ Added ${item.name} to cart!`;
//   this.showToast = true;

//   setTimeout(() => {
//     this.showToast = false;
//     this.cdr.detectChanges();
//   }, 3000);
// }

// showLoginAlert(event: Event) {
//   event.preventDefault();
//   event.stopPropagation();

//   alert('Please sign in first');
//   this.router.navigate(['/login']);
// }


// get isLoggedIn(): boolean {
//   return !!localStorage.getItem('token');
// }


//  onSearchChange(): void {
//   this.page = 1;
//   this.isFiltered = true;
//   this.loadProducts();
// }


// loadProducts(): void {

//   this.loading = true;

//   const hasSearch =
//     this.search &&
//     this.search.trim().length > 0;


// const useFilter =
//   this.search.trim().length > 0 ||
//   this.categoryId !== null ||
//   this.vegeterian === true ||
//   this.spiciness > 0 ||
//   this.rate > 0 ||
//   this.minPrice > 0 ||
//   this.maxPrice < 100;

//   const urlPath =
//     useFilter
//       ? 'products/filter'
//       : 'products';

//   let params =
//     `Take=${this.take}&Page=${this.page}`;

//   if (useFilter) {

//     if (hasSearch)
//       params += `&query=${encodeURIComponent(this.search.trim())}`;

//     if (this.categoryId)
//       params += `&CategoryId=${this.categoryId}`;

//     if (this.vegeterian)
//       params += `&Vegetarian=true`;

//     if (this.spiciness > 0)
//       params += `&Spiciness=${this.spiciness}`;

//     if (this.rate > 0)
//       params += `&Rate=${this.rate}`;

//     params += `&MinPrice=${this.minPrice}&MaxPrice=${this.maxPrice}`;
//   }

//   this.fetchData(`${urlPath}?${params}`);
// }

// private fetchData(url: string): void {
//   this.api.getDatafromApi(url).subscribe({
//     next: (response: any) => {

//       this.productsarr = response.data.products;

//       this.hasMore = response.data.hasMore;

//       this.cdr.detectChanges();
//       this.loading = false;
//     },
//     error: (err) => {
//       console.log(err);
//       alert('Failed to load menu');
//       this.loading = false;
//     }
//   });
// }

// filter(): void{
//   if (this.minPrice > this.maxPrice) return;
//   this.page = 1;
//   this.isFiltered = true;
//   this.loadProducts();
// }

// resetFilter(): void {
//   // 1. RESET ALL STATE FIRST
//   this.isFiltered = false;

//   this.rate = 0;
//   this.spiciness = 0;
//   this.minPrice = 0;
//   this.maxPrice = 100;
//   this.vegeterian = false;
//   this.categoryId = null;
//   this.search = "";

//   this.page = 1;

//   this.loadProducts();
// }

// loadCategory():void {
//   this.loading = true;
// this.api.getDatafromApi(`categories`).subscribe({
//     next: (response: any) => {
//       console.log(response.data);
//       this.category.category = response.data;
//       this.cdr.detectChanges();
//       this.loading = false;
// },
//     error: (_err): void => {
//       alert('Failed to load menu');
//       this.loading = false;
//     }
//   });  

// }

// onSelectCategory(id: number): void {
  
//   this.categoryId = (this.categoryId === id) ? null : id;
//    this.page = 1;
//   this.isFiltered = true; 
//   this.loadProducts();
// }


// allProducts: Product[] = []; 

// onFilterChange(): void {
//   this.page = 1;
//   this.isFiltered = true;
//   this.loadProducts();
// }


// }


import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Category, Product } from '../models/product';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router
  ) {}

  // DATA
  categoriesarr: Category[] = [];
  productsarr: Product[] = [];
  allProducts: Product[] = [];

  // UI STATE
  loading = false;
  showToast = false;
  toastMessage = '';

  // FILTERS
  categoryId: number | null = null;
  search = '';
  vegeterian = false;
  spiciness = 0;
  rate = 0;
  minPrice = 0;
  maxPrice = 100;

  page = 1;
  take = 100;
  hasMore = false;
  isFiltered = false;

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  // PRODUCTS
  loadProducts(): void {

    this.loading = true;

    const hasSearch = this.search.trim().length > 0;

    const useFilter =
      hasSearch ||
      this.categoryId !== null ||
      this.vegeterian ||
      this.spiciness > 0 ||
      this.rate > 0 ||
      this.minPrice > 0 ||
      this.maxPrice < 100;

    const url = useFilter ? 'products/filter' : 'products';

    let params = `Take=${this.take}&Page=${this.page}`;

    if (useFilter) {

      if (hasSearch)
        params += `&query=${encodeURIComponent(this.search.trim())}`;

      if (this.categoryId)
        params += `&CategoryId=${this.categoryId}`;

      if (this.vegeterian)
        params += `&Vegetarian=true`;

      if (this.spiciness > 0)
        params += `&Spiciness=${this.spiciness}`;

      if (this.rate > 0)
        params += `&Rate=${this.rate}`;

      params += `&MinPrice=${this.minPrice}&MaxPrice=${this.maxPrice}`;
    }

    this.api.getAll(`${url}?${params}`).subscribe({
      next: (res: any) => {
        this.productsarr = res.data.products;
        this.hasMore = res.data.hasMore;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        alert('Failed to load products');
      }
    });
  }

  // CATEGORIES (FIXED)
  loadCategories(): void {

    this.loading = true;

    this.api.getAll('categories').subscribe({
      next: (res: any) => {
        this.categoriesarr = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        alert('Failed to load categories');
      }
    });
  }

  // CART
// addToCart(item: Product, event: Event) {

//   event.stopPropagation();
//   event.preventDefault();

//   this.cartService.addToCart(item.id, 1).subscribe({

//     next: () => {

//       this.toastMessage = `Added ${item.name}`;
//       this.showToast = true;

//       setTimeout(() => {
//         this.showToast = false;
//         this.cdr.detectChanges();
//       }, 3000);

//     },

//     error: (err) => {
//       console.log(err);
//     }

//   });

// }

addToCart(item: Product, event: Event) {

  // IMPORTANT: only stop propagation, NOT preventDefault
  event.stopPropagation();

  // instant feedback (IMPORTANT)
  this.toastMessage = `Adding ${item.name}...`;
  this.showToast = true;

  this.cartService.addToCart(item.id, 1).subscribe({
    next: () => {

      this.toastMessage = `Added ${item.name}`;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.showToast = false;
        this.cdr.detectChanges();
      }, 1500);

    },

    error: (err) => {
      console.log(err);
      this.toastMessage = `Failed to add`;
      this.showToast = true;
    }
  });
}

  // AUTH CHECK
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  showLoginAlert(event: Event) {
    event.preventDefault();
    alert('Please sign in first');
    this.router.navigate(['/login']);
  }

  // FILTERS
  onSearchChange() {
    this.page = 1;
    this.loadProducts();
  }

  onSelectCategory(id: number) {
    this.categoryId = this.categoryId === id ? null : id;
    this.page = 1;
    this.loadProducts();
  }

  resetFilter() {
    this.search = '';
    this.categoryId = null;
    this.vegeterian = false;
    this.spiciness = 0;
    this.rate = 0;
    this.minPrice = 0;
    this.maxPrice = 100;
    this.page = 1;

    this.loadProducts();
  }

  filter() {
    if (this.minPrice > this.maxPrice) return;
    this.page = 1;
    this.loadProducts();
  }
}
