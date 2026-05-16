import { ChangeDetectorRef, Component } from '@angular/core';
import { Helper } from '../services/helper';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { Router, RouterModule } from '@angular/router';
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
              private cartService: CartService,
              private router:Router ){
    
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

get isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

showLoginAlert(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  alert('Please sign in first');
  this.router.navigate(['/login']);
}

  
}
