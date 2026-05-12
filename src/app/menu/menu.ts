import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Categories, Product } from '../models/product';
import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';
import { FormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, FormsModule, RouterLinkWithHref],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  // constructor(private api:Api,
  //             private cdr:ChangeDetectorRef,
  //             private cartService: CartService,
  //             private router:Router){}



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


//   filterByCategory(categoryId: number) {
//      this.selectedCategoryId = categoryId;
//   this.api.getAll(`products/filter?CategoryId=${categoryId}&Take=100&Page=1`)
//     .subscribe((resp: any) => {
//       console.log('Filtered:', resp.data.products)
//       this.productsarr = resp.data.products
//       this.cdr.detectChanges()
//     });
// }

// all(){
//   this.selectedCategoryId = null;
//       this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
//       console.log(resp.data.products)
//       this.productsarr=resp.data.products
//       this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
//     })
// }
    

// selectedCategoryId: number | null = null;

  categoriesarr:Categories[]=[]
  productsarr:Product[]=[]


//      selectedProduct!:Product
  showToast = false;
  toastMessage = '';



//   quantity = 1;


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

showLoginAlert(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  alert('Please sign in first');
  this.router.navigate(['/login']);
}

// selectedRate: number = 0;
// allProducts: Product[] = [];



// filterByRate() {
//   this.productsarr = this.allProducts.filter(p =>
//     p.rate >= this.selectedRate
//   );

//   this.cdr.detectChanges();
// }

// selectedSpicy: number = 0;


// filterBySpicy() {
//   this.productsarr = this.allProducts.filter(p =>
//     p.spiciness >= this.selectedSpicy
//   );

//   this.cdr.detectChanges();
// }



// selectedPrice: number = 100;
// filterByPrice() {
//   this.productsarr = this.allProducts.filter(p =>
//     p.price <= this.selectedPrice
//   );

//   this.cdr.detectChanges();
// }


// vegetarian: boolean = false;

// toggleVegetarian() {
//   this.vegetarian = !this.vegetarian;

//   this.productsarr = this.allProducts.filter(p => {
//     return this.vegetarian ? p.vegetarian === true : true;
//   });

//   this.cdr.detectChanges();
// }

// searchText: string = '';


// filterBySearch() {
//   let text = this.searchText.toLowerCase().trim();

//   this.productsarr = this.allProducts.filter(p => {
//     return (
//       p.name.toLowerCase().includes(text) ||
//       p.description.toLowerCase().includes(text)
//     );
//   });

//   this.cdr.detectChanges();
// }



// resetAll(){
//   this.vegetarian = false;
//   this.selectedCategoryId = null;
//   this.selectedRate = 0;
//   this.selectedSpicy = 0;
//   this.selectedPrice = 100;
//   this.productsarr = this.allProducts;
//   this.searchText = '';
//   this.cdr.detectChanges();
// }


get isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

  isFiltered: boolean = false;
  categoryId: number | null = null;
  constructor(private api: Api, private cdr : ChangeDetectorRef, private cartService: CartService, private router: Router) {}
  data: { products: Product[] } = { products: [] };
  category: { category: any[] } = { category: Categories.list };
  page = 1;
  take = 100;
  hasMore = false;
  loading = false;

vegeterian: boolean = false;
spiciness: number = 0
rate = 0;
minPrice = 0;
maxPrice = 100

search = ""

 onSearchChange(): void {
  this.page = 1;
  this.isFiltered = true;
  this.loadProducts();
}
//   loadProducts(): void {
//   this.loading = true;  
//   const hasSearch = this.search && this.search.trim().length > 0;  
//   const useFilter = this.isFiltered || hasSearch;
//   const urlPath = useFilter ? 'products/filter' : 'products'; 
//   let params = `Take=${this.take}&Page=${this.page}`;  
//   if (useFilter) {
//      if (hasSearch) params += `&query=${encodeURIComponent(this.search.trim())}`;
    
//     if (this.categoryId) params += `&CategoryId=${this.categoryId}`;
//     if (this.vegeterian) params += `&Vegetarian=true`;
//     if (this.spiciness > 0) params += `&Spiciness=${this.spiciness}`;
//     if (this.rate > 0) params += `&Rate=${this.rate}`;
    
//     params += `&MinPrice=${this.minPrice}&MaxPrice=${this.maxPrice}`;
//   }
 
//   this.fetchData(`${urlPath}?${params}`);
// }

loadProducts(): void {

  this.loading = true;

  const hasSearch =
    this.search &&
    this.search.trim().length > 0;

// const useFilter =
//   hasSearch ||
//   this.categoryId !== null ||
//   this.vegeterian ||
//   this.spiciness > 0 ||
//   this.rate > 0 ||
//   this.minPrice > 0 ||
//   this.maxPrice < 100;

const useFilter =
  this.search.trim().length > 0 ||
  this.categoryId !== null ||
  this.vegeterian === true ||
  this.spiciness > 0 ||
  this.rate > 0 ||
  this.minPrice > 0 ||
  this.maxPrice < 100;

  const urlPath =
    useFilter
      ? 'products/filter'
      : 'products';

  let params =
    `Take=${this.take}&Page=${this.page}`;

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

  this.fetchData(`${urlPath}?${params}`);
}


// private fetchData(url: string): void {
//   this.api.getDatafromApi(url).subscribe({
//     next: (response: any) => {
//       this.productsarr = response.data.products;
     
//       this.hasMore = response.data.hasMore; 
//       this.cdr.detectChanges();
//       this.loading = false;
//     },
//     error: () => {
//       alert('Failed to load menu');
//       this.loading = false;
//     }
//   });
// }
private fetchData(url: string): void {
  this.api.getDatafromApi(url).subscribe({
    next: (response: any) => {

      this.productsarr = response.data.products;

      this.hasMore = response.data.hasMore;

      this.cdr.detectChanges();
      this.loading = false;
    },
    error: (err) => {
      console.log(err);
      alert('Failed to load menu');
      this.loading = false;
    }
  });
}

filter(): void{
  if (this.minPrice > this.maxPrice) return;
  this.page = 1;
  this.isFiltered = true;
  this.loadProducts();
}

// filter() {
//   // 1. Start with the full list of products
//   let filtered = [...this.allProducts]; // Use your original full array here

//   // 2. Filter by Max Price (The Fix)
//   if (this.maxPrice !== null && this.maxPrice !== undefined) {
//     const limit = Number(this.maxPrice); // Force it to be a number
//     filtered = filtered.filter(p => p.price <= limit);
//   }

//   // 3. Filter by Spiciness
//   if (this.spiciness) {
//     filtered = filtered.filter(p => p.spiciness === Number(this.spiciness));
//   }

//   // ... add your other filters (search, rate, category) here ...

//   // 4. Update the array that the HTML loops over
//   this.productsarr = filtered;
// }

// filter() {
//   // Use a temporary copy so you don't overwrite your original data source
//   let results = [...this.allProducts];

//   // Force MaxPrice to be a number (prevents string comparison errors)
//   const priceLimit = Number(this.maxPrice);

//   results = results.filter(product => {
//     const matchesPrice = product.price <= priceLimit;
//     // Add other logic here...
//     return matchesPrice;
//   });

//   this.productsarr = results;
// }

// resetFilter(): void {
//   this.isFiltered = false;
//   this.page = 1;
//   this.loadProducts();
//   this.rate = 0;
//   this.spiciness = 0;
//   this.minPrice = 0;
//   this.maxPrice = 100;
//   this.vegeterian = false;
//   this.categoryId = null;
//   this.search = "";
//   }

resetFilter(): void {
  // 1. RESET ALL STATE FIRST
  this.isFiltered = false;

  this.rate = 0;
  this.spiciness = 0;
  this.minPrice = 0;
  this.maxPrice = 100;
  this.vegeterian = false;
  this.categoryId = null;
  this.search = "";

  this.page = 1;

  // 2. FORCE LOAD WITHOUT FILTER
  this.loadProducts();
}

loadCategory():void {
  this.loading = true;
this.api.getDatafromApi(`categories`).subscribe({
    next: (response: any) => {
      console.log(response.data);
      this.category.category = response.data;
    //  console.log('category', this.category.category);
      this.cdr.detectChanges();
      this.loading = false;
},
    error: (_err): void => {
      alert('Failed to load menu');
      this.loading = false;
    }
  });  

}

onSelectCategory(id: number): void {
  
  this.categoryId = (this.categoryId === id) ? null : id;
   this.page = 1;
  this.isFiltered = true; 
  this.loadProducts();
}


// onSelectCategory(id: number, event: any) {
//   // If the user clicks an already selected checkbox, unselect it
//   if (this.categoryId === id) {
//     this.categoryId = null; 
//   } else {
//     this.categoryId = id;
//   }
  
//   // Run the filter immediately with the new categoryId
//   this.filter();
// }




allProducts: Product[] = []; 

onFilterChange(): void {
  this.page = 1;
  this.isFiltered = true;
  this.loadProducts();
}





}

